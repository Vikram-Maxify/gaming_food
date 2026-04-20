const User = require("../models/authModels");
const Game = require("../models/gameModel");

// 🧠 check winner
const checkWinner = (board) => {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (let [a, b, c] of wins) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (board.every(cell => cell !== "")) return "draw";

    return null;
};

const gameSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        const ENTRY_FEE = 10; 

        socket.on("joinGame", async ({ tableId, userId }) => {
            try {
                const user = await User.findById(userId);

                // ❌ user not found
                if (!user) {
                    return socket.emit("errorMessage", "User not found");
                }

                let game = await Game.findOne({
                    table: tableId,
                    status: { $in: ["waiting", "playing"] },
                });

                // ✅ prevent duplicate join
                const alreadyJoined = game?.players?.some(
                    (p) => p.user?.toString() === userId.toString()
                );

                if (alreadyJoined) {
                    socket.join(tableId);
                    return io.to(tableId).emit("gameUpdate", game);
                }

                // ❌ check credits (ONLY for real users)
                if (user.credits < ENTRY_FEE) {
                    return socket.emit("errorMessage", "Not enough credits");
                }

                // 💰 deduct credits
                user.credits -= ENTRY_FEE;
                await user.save();

                socket.join(tableId);

                // 🟢 FIRST PLAYER
                if (!game) {
                    game = await Game.create({
                        table: tableId,
                        players: [{ user: userId, symbol: "X" }],
                    });

                    // ⏳ WAIT FOR SECOND PLAYER
                    setTimeout(async () => {
                        const updatedGame = await Game.findById(game._id);

                        if (
                            updatedGame &&
                            updatedGame.players.length === 1 &&
                            updatedGame.status === "waiting"
                        ) {
                            console.log("🤖 Adding computer...");

                            updatedGame.players.push({
                                user: null,
                                symbol: "O",
                            });

                            updatedGame.status = "playing";
                            await updatedGame.save();

                            io.to(tableId).emit("gameUpdate", updatedGame);

                            // 🤖 auto move if needed
                            if (updatedGame.turn === "O") {
                                setTimeout(async () => {
                                    const freshGame = await Game.findById(updatedGame._id);
                                    makeComputerMove(freshGame, io);
                                }, 1000);
                            }
                        }
                    }, 10000);
                }

                // 🟢 SECOND PLAYER
                else if (game.players.length < 2) {
                    game.players.push({ user: userId, symbol: "O" });
                    game.status = "playing";
                    await game.save();
                }

                io.to(tableId).emit("gameUpdate", game);

            } catch (error) {
                socket.emit("errorMessage", error.message);
            }
        });

        // 🤖 COMPUTER MOVE
        const makeComputerMove = async (game, io) => {
            if (!game || game.status !== "playing") return;

            const emptyIndexes = game.board
                .map((val, i) => (val === "" ? i : null))
                .filter((v) => v !== null);

            if (emptyIndexes.length === 0) return;

            const randomIndex =
                emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

            game.board[randomIndex] = "O";

            const winner = checkWinner(game.board);

            if (winner) {
                game.winner = winner;
                game.status = "finished";
            } else {
                game.turn = "X";
            }

            await game.save();

            io.to(game.table.toString()).emit("gameUpdate", game);
        };

        // 🎯 PLAYER MOVE
        socket.on("makeMove", async ({ gameId, index, symbol }) => {
            const game = await Game.findById(gameId);

            if (!game || game.status !== "playing") return;

            if (game.board[index] !== "" || game.turn !== symbol) return;

            // ✅ player move
            game.board[index] = symbol;

            const winner = checkWinner(game.board);

            if (winner) {
                game.winner = winner;
                game.status = "finished";
            } else {
                game.turn = symbol === "X" ? "O" : "X";
            }

            await game.save();

            io.to(game.table.toString()).emit("gameUpdate", game);

            // 🤖 check computer exists
            const isComputer = game.players.some(
                (p) => p.symbol === "O" && (p.user === null || p.user === undefined)
            );

            // 🤖 computer turn
            if (isComputer && game.turn === "O" && game.status === "playing") {
                setTimeout(async () => {
                    const freshGame = await Game.findById(game._id);
                    makeComputerMove(freshGame, io);
                }, 1000);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = gameSocket;