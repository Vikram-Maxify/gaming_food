const CarGame = require("../models/carGameModel");
const User = require("../models/authModels");

const ENTRY_FEE = 10;
const WIN_REWARD = 100;
const FINISH = 100;

const carSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🚗 Car user:", socket.id);

    // 🟢 JOIN GAME
    socket.on("joinCar", async ({ tableId, userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          return socket.emit("errorMessage", "User not found");
        }

        let game = await CarGame.findOne({
          table: tableId,
          status: { $in: ["waiting", "playing"] },
        });

        // already joined
        const alreadyJoined = game?.players?.some(
          (p) => p.user?.toString() === userId.toString()
        );

        if (alreadyJoined) {
          socket.join(tableId);
          return io.to(tableId).emit("carUpdate", game);
        }

        // balance check
        if (user.credit < ENTRY_FEE) {
          return socket.emit("errorMessage", "Insufficient balance");
        }

        // deduct entry fee
        user.credit -= ENTRY_FEE;
        await user.save();

        socket.join(tableId);

        // 🟢 FIRST PLAYER
        if (!game) {
          game = await CarGame.create({
            table: tableId,
            players: [{ user: userId, progress: 0 }],
            pot: ENTRY_FEE,
            status: "waiting",
          });

          setTimeout(async () => {
            const updatedGame = await CarGame.findById(game._id);

            if (
              updatedGame &&
              updatedGame.players.length === 1 &&
              updatedGame.status === "waiting"
            ) {
              updatedGame.players.push({
                user: null, // 🤖 computer
                progress: 0,
              });

              updatedGame.status = "playing";
              updatedGame.pot += ENTRY_FEE;

              await updatedGame.save();

              io.to(tableId).emit("carUpdate", updatedGame);

              setTimeout(() => {
                makeComputerMove(updatedGame._id, io);
              }, 1000);
            }
          }, 10000);
        }

        // 🟢 SECOND PLAYER
        else if (game.players.length < 2) {
          game.players.push({ user: userId, progress: 0 });
          game.status = "playing";
          game.pot += ENTRY_FEE;

          await game.save();
        }

        io.to(tableId).emit("carUpdate", game);
      } catch (err) {
        socket.emit("errorMessage", err.message);
      }
    });

    // 🤖 COMPUTER MOVE
    const makeComputerMove = async (gameId, io) => {
      const game = await CarGame.findById(gameId);
      if (!game || game.status !== "playing") return;

      const computer = game.players.find((p) => !p.user);
      if (!computer) return;

      computer.progress += Math.floor(Math.random() * 10) + 5;

      // 🏁 WIN CHECK
      if (computer.progress >= FINISH) {
        game.status = "finished";
        game.winner = null;
      }

      await game.save();

      io.to(game.table.toString()).emit("carUpdate", game);

      if (game.status === "playing") {
        setTimeout(() => makeComputerMove(game._id, io), 1000);
      }
    };

    // 🚀 PLAYER ACCELERATE
    socket.on("accelerate", async ({ gameId, userId }) => {
      const game = await CarGame.findById(gameId);
      if (!game || game.status !== "playing") return;

      const player = game.players.find(
        (p) => p.user?.toString() === userId.toString()
      );

      if (!player) return;

      player.progress += Math.floor(Math.random() * 10) + 5;

      // 🏁 WIN
      if (player.progress >= FINISH) {
        game.status = "finished";
        game.winner = player.user;

        const user = await User.findById(player.user);
        if (user) {
          user.credit += WIN_REWARD; // ✅ 100 added
          await user.save();
        }
      }

      await game.save();

      io.to(game.table.toString()).emit("carUpdate", game);

      // 🤖 restart computer if needed
      if (game.status === "playing" && game.players.some((p) => !p.user)) {
        setTimeout(() => makeComputerMove(game._id, io), 1000);
      }
    });
  });
};

module.exports = carSocket;