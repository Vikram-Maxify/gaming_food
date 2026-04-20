const User = require("../models/authModels");
const LudoGame = require("../models/ludoGameModel");

const WIN_POSITION = 20;

const ludoSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("🎲 Ludo user connected:", socket.id);

        // 🎮 JOIN GAME (TABLE BASED)

        const ENTRY_FEE = 10;

        socket.on("joinLudo", async ({ tableId, userId }) => {
            try {
                const user = await User.findById(userId);

                // ❌ user not found
                if (!user) {
                    return socket.emit("errorMessage", "User not found");
                }

                // ❌ not enough credits
                if (user.credits < ENTRY_FEE) {
                    return socket.emit("errorMessage", "Not enough credits");
                }

                // 💰 deduct credits
                user.credits -= ENTRY_FEE;
                await user.save();

                socket.join(tableId);

                let game = await LudoGame.findOne({
                    table: tableId,
                    status: "waiting",
                });

                // 🟢 FIRST PLAYER
                if (!game) {
                    game = await LudoGame.create({
                        table: tableId,
                        players: [{ user: userId, color: "red" }],
                    });

                    // ⏳ wait for 2nd player
                    setTimeout(async () => {
                        const updatedGame = await LudoGame.findById(game._id);

                        if (
                            updatedGame &&
                            updatedGame.players.length === 1 &&
                            updatedGame.status === "waiting"
                        ) {
                            // 🤖 add computer (no credits needed)
                            updatedGame.players.push({
                                user: null,
                                color: "blue",
                            });

                            updatedGame.status = "playing";
                            await updatedGame.save();

                            io.to(tableId).emit("ludoUpdate", updatedGame);
                        }
                    }, 10000);
                }

                // 🟢 SECOND PLAYER
                else if (game.players.length < 2) {
                    game.players.push({ user: userId, color: "blue" });
                    game.status = "playing";
                    await game.save();
                }

                io.to(tableId).emit("ludoUpdate", game);

            } catch (err) {
                socket.emit("errorMessage", err.message);
            }
        });

        // 🎲 ROLL DICE
        socket.on("rollDice", async ({ gameId, color }) => {
            const game = await LudoGame.findById(gameId);

            if (!game || game.turn !== color) return;

            const dice = Math.floor(Math.random() * 6) + 1;
            game.dice = dice;

            await game.save();

            io.to(game.table.toString()).emit("ludoUpdate", game);

            // 🤖 COMPUTER AUTO MOVE
            const isComputer = game.players.some(
                (p) => p.color === "blue" && (p.user === null || p.user === undefined)
            );

            if (isComputer && game.turn === "blue") {
                setTimeout(async () => {
                    const freshGame = await LudoGame.findById(game._id);
                    makeComputerMove(freshGame, io);
                }, 1000);
            }
        });

        // 🚶 MOVE TOKEN
        socket.on("moveToken", async ({ gameId, color, tokenIndex }) => {
            const game = await LudoGame.findById(gameId);

            if (!game || game.turn !== color) return;

            const dice = game.dice;
            if (dice === 0) return;

            let position = game.board[color][tokenIndex];

            position += dice;

            if (position > WIN_POSITION) return;

            game.board[color][tokenIndex] = position;

            // 🏆 WIN CHECK
            if (game.board[color].every((p) => p === WIN_POSITION)) {
                game.winner = color;
                game.status = "finished";
            } else {
                game.turn = color === "red" ? "blue" : "red";
            }

            game.dice = 0;

            await game.save();

            io.to(game.table.toString()).emit("ludoUpdate", game);

            // 🤖 COMPUTER TURN AFTER PLAYER MOVE
            const isComputer = game.players.some(
                (p) => p.color === "blue" && (p.user === null || p.user === undefined)
            );

            if (isComputer && game.turn === "blue" && game.status === "playing") {
                setTimeout(async () => {
                    const freshGame = await LudoGame.findById(game._id);
                    makeComputerMove(freshGame, io);
                }, 1000);
            }
        });

        // 🤖 COMPUTER LOGIC
        const makeComputerMove = async (game, io) => {
            if (!game || game.status !== "playing") return;

            // 🎲 roll dice
            const dice = Math.floor(Math.random() * 6) + 1;
            game.dice = dice;

            // find movable tokens
            const tokens = game.board.blue
                .map((pos, i) => ({ pos, i }))
                .filter((t) => t.pos + dice <= WIN_POSITION);

            if (tokens.length === 0) {
                game.turn = "red";
                game.dice = 0;
                await game.save();
                io.to(game.table.toString()).emit("ludoUpdate", game);
                return;
            }

            const randomToken =
                tokens[Math.floor(Math.random() * tokens.length)];

            game.board.blue[randomToken.i] += dice;

            // 🏆 check win
            if (game.board.blue.every((p) => p === WIN_POSITION)) {
                game.winner = "blue";
                game.status = "finished";
            } else {
                game.turn = "red";
            }

            game.dice = 0;

            await game.save();

            io.to(game.table.toString()).emit("ludoUpdate", game);
        };

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = ludoSocket;