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
        if (user.credit < ENTRY_FEE) {
          return socket.emit("errorMessage", "Insufficient balance");
        }

        // 💰 deduct
        user.credit -= ENTRY_FEE;
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

              // ✅ 👉 ADD THIS (IMPORTANT)
              setTimeout(async () => {
                const freshGame = await CarGame.findById(updatedGame._id);
                makeComputerMove(freshGame, io);
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

    const makeComputerMove = async (game, io) => {
      if (game.status !== "playing") return;

      const computer = game.players.find(p => !p.user);

      if (!computer) return;

      // random speed
      computer.progress += Math.floor(Math.random() * 10) + 5;

      // 🏁 win check
      if (computer.progress >= FINISH) {
        game.status = "finished";
        game.winner = null; // 🤖 computer winner
      }

      await game.save();

      io.to(game.table.toString()).emit("carUpdate", game);

      // 🔁 keep moving until finish
      if (game.status === "playing") {
        setTimeout(async () => {
          const freshGame = await CarGame.findById(game._id);
          makeComputerMove(freshGame, io);
        }, 1000);
      }
    };

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

        if (player.user) {
          const user = await User.findById(player.user);
          user.credits += WIN_REWARD;
          await user.save();
        }
      }

      await game.save();

      io.to(game.table.toString()).emit("carUpdate", game);

      // 🤖 👉 ADD THIS HERE (IMPORTANT)
      if (game.status === "playing") {
        const isComputer = game.players.some(p => !p.user);

        if (isComputer) {
          setTimeout(async () => {
            const freshGame = await CarGame.findById(game._id);
            makeComputerMove(freshGame, io);
          }, 1000);
        }
      }
    });
  });
};

module.exports = carSocket;