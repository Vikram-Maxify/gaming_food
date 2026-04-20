const CarGame = require("../models/carGameModel");
const User = require("../models/authModels");

const ENTRY_FEE = 10;
const WIN_REWARD = 18;
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

        // ✅ already joined
        const alreadyJoined = game?.players?.some(
          (p) => p.user?.toString() === userId.toString()
        );

        if (alreadyJoined) {
          socket.join(tableId);
          return io.to(tableId).emit("carUpdate", game);
        }

        // ❌ balance check
        if (user.credits < ENTRY_FEE) {
          return socket.emit("errorMessage", "Insufficient balance");
        }

        // 💰 deduct
        user.credits -= ENTRY_FEE;
        await user.save();

        socket.join(tableId);

        // 🟢 FIRST PLAYER
        if (!game) {
          game = await CarGame.create({
            table: tableId,
            players: [{ user: userId, progress: 0 }],
            pot: ENTRY_FEE,
          });

          // ⏳ wait for 2nd player
          setTimeout(async () => {
            const updatedGame = await CarGame.findById(game._id);

            if (
              updatedGame &&
              updatedGame.players.length === 1 &&
              updatedGame.status === "waiting"
            ) {
              console.log("🤖 Computer joined");

              updatedGame.players.push({
                user: null,
                progress: 0,
              });

              updatedGame.status = "playing";
              updatedGame.pot += ENTRY_FEE;

              await updatedGame.save();

              io.to(tableId).emit("carUpdate", updatedGame);
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

    // 🚀 ACCELERATE
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

        // 💰 reward
        if (player.user) {
          const user = await User.findById(player.user);
          user.credits += WIN_REWARD;
          await user.save();
        }
      }

      await game.save();

      io.to(game.table.toString()).emit("carUpdate", game);
    });
  });
};

module.exports = carSocket;