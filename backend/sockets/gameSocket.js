const Game = require("../models/gameModel");

const checkWinner = (board) => {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
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

    // ✅ JOIN TABLE (MATCHMAKING)
    socket.on("joinGame", async ({ tableId, userId }) => {
      socket.join(tableId);

      let game = await Game.findOne({ table: tableId, status: "waiting" });

      if (!game) {
        // create new game
        game = await Game.create({
          table: tableId,
          players: [{ user: userId, symbol: "X" }],
        });
      } else {
        // second player joins
        game.players.push({ user: userId, symbol: "O" });
        game.status = "playing";
        await game.save();
      }

      io.to(tableId).emit("gameUpdate", game);
    });

    // ✅ MAKE MOVE
    socket.on("makeMove", async ({ gameId, index, symbol }) => {
      const game = await Game.findById(gameId);

      if (!game || game.status !== "playing") return;

      if (game.board[index] !== "" || game.turn !== symbol) return;

      game.board[index] = symbol;

      // check winner
      const winner = checkWinner(game.board);

      if (winner) {
        game.winner = winner;
        game.status = "finished";
      } else {
        game.turn = symbol === "X" ? "O" : "X";
      }

      await game.save();

      io.to(game.table.toString()).emit("gameUpdate", game);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = gameSocket;