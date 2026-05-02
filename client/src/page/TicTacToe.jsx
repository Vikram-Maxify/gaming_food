import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("devine.trueprofit.biz", {
  withCredentials: true,
});

const TicTacToe = () => {
  const [tableId, setTableId] = useState("");
  const [userId, setUserId] = useState("");
  const [game, setGame] = useState(null);
  const [symbol, setSymbol] = useState("");

  const joinGame = () => {
    if (!tableId || !userId) {
      alert("Enter tableId & userId");
      return;
    }
    socket.emit("joinGame", { tableId, userId });
  };

  useEffect(() => {
    socket.on("gameUpdate", (data) => {
      setGame(data);

      const me = data.players.find((p) => p.user === userId);
      if (me) setSymbol(me.symbol);
    });

    return () => socket.off("gameUpdate");
  }, [userId]);

  const handleClick = (index) => {
    if (!game) return;
    if (game.turn !== symbol) return; // ❌ prevent wrong turn

    socket.emit("makeMove", {
      gameId: game._id,
      index,
      symbol,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      
      <h1 className="text-4xl font-bold mb-6">🎮 Tic Tac Toe</h1>

      {!game && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-80">
          <input
            className="w-full p-2 mb-3 rounded bg-gray-700 outline-none"
            placeholder="Enter Table ID"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
          />

          <input
            className="w-full p-2 mb-4 rounded bg-gray-700 outline-none"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <button
            onClick={joinGame}
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
          >
            Join Game
          </button>
        </div>
      )}

      {game && (
        <>
          <div className="mb-4 text-center">
            <p className="text-lg">Status: {game.status}</p>
            <p>Your Symbol: <span className="font-bold">{symbol}</span></p>
            <p>Turn: <span className="font-bold">{game.turn}</span></p>

            {game.winner && (
              <h2 className="text-2xl mt-2 text-green-400">
                {game.winner === "draw"
                  ? "Draw 🤝"
                  : `Winner: ${game.winner}`}
              </h2>
            )}
          </div>

          {/* 🎯 BOARD */}
          <div className="grid grid-cols-3 gap-3">
            {game.board.map((cell, i) => (
              <div
                key={i}
                onClick={() => handleClick(i)}
                className={`w-24 h-24 flex items-center justify-center text-3xl font-bold rounded-lg cursor-pointer
                ${
                  cell
                    ? "bg-gray-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {cell}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TicTacToe;