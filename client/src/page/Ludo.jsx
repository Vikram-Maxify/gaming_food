import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("devine.trueprofit.biz", {
  withCredentials: true,
});

const Ludo = () => {
  const [tableId, setTableId] = useState("");
  const [userId, setUserId] = useState("");
  const [game, setGame] = useState(null);
  const [color, setColor] = useState("");

  // JOIN
  const joinGame = () => {
    if (!tableId || !userId) {
      alert("Enter tableId & userId");
      return;
    }
    socket.emit("joinLudo", { tableId, userId });
  };

  // LISTEN
  useEffect(() => {
    socket.on("ludoUpdate", (data) => {
      setGame(data);

      const me = data.players.find(
        (p) => p.user?.toString() === userId.toString()
      );
      if (me) setColor(me.color);
    });

    return () => socket.off("ludoUpdate");
  }, [userId]);

  // ROLL
  const rollDice = () => {
    if (!game || game.turn !== color) return;

    socket.emit("rollDice", {
      gameId: game._id,
      color,
    });
  };

  // MOVE
  const moveToken = (index) => {
    if (!game || game.turn !== color) return;
    if (game.dice === 0) return;

    socket.emit("moveToken", {
      gameId: game._id,
      color,
      tokenIndex: index,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">

      <h1 className="text-3xl font-bold mb-4">🎲 Ludo</h1>

      {/* JOIN */}
      {!game?._id && (
        <div className="bg-gray-800 p-5 rounded w-80">
          <input
            className="w-full p-2 mb-2 bg-gray-700 rounded"
            placeholder="Table ID"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
          />

          <input
            className="w-full p-2 mb-3 bg-gray-700 rounded"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <button
            onClick={joinGame}
            className="w-full bg-blue-600 p-2 rounded"
          >
            Join Game
          </button>
        </div>
      )}

      {/* GAME */}
      {game?._id && (
        <>
          {/* INFO */}
          <div className="bg-gray-800 p-3 rounded mb-4 text-center">
            <p>Turn: {game.turn}</p>
            <p>Your: {color}</p>
            <p>Dice: {game.dice}</p>
            {game.winner && <p className="text-green-400">Winner: {game.winner}</p>}
          </div>

          {/* ROLL */}
          {game.turn === color && game.dice === 0 && (
            <button
              onClick={rollDice}
              className="bg-yellow-500 text-black px-4 py-2 rounded mb-4"
            >
              Roll Dice 🎲
            </button>
          )}

          {/* 🎯 REAL BOARD */}
          <div className="grid grid-cols-15 grid-rows-15 w-[450px] h-[450px] border-4 border-black">

            {/* RED HOME */}
            <div className="col-span-6 row-span-6 bg-red-500 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3">
                {game.board.red.map((pos, i) => (
                  <div
                    key={i}
                    onClick={() => moveToken(i)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
                  >
                    {pos}
                  </div>
                ))}
              </div>
            </div>

            {/* BLUE HOME */}
            <div className="col-span-6 row-span-6 bg-blue-500 col-start-10 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3">
                {game.board.blue.map((pos, i) => (
                  <div
                    key={i}
                    onClick={() => moveToken(i)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer"
                  >
                    {pos}
                  </div>
                ))}
              </div>
            </div>

            {/* GREEN */}
            <div className="col-span-6 row-span-6 bg-green-500 row-start-10 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3">
                {[0,1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 bg-white rounded-full"></div>
                ))}
              </div>
            </div>

            {/* YELLOW */}
            <div className="col-span-6 row-span-6 bg-yellow-400 row-start-10 col-start-10 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-3">
                {[0,1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 bg-white rounded-full"></div>
                ))}
              </div>
            </div>

            {/* CENTER CROSS */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="border col-start-7 row-start-[${i+1}] bg-gray-200"></div>
            ))}

            {[...Array(15)].map((_, i) => (
              <div key={i} className="border row-start-7 col-start-[${i+1}] bg-gray-200"></div>
            ))}

            {/* CENTER */}
            <div className="col-start-7 row-start-7 col-span-3 row-span-3 grid grid-cols-2 grid-rows-2">
              <div className="bg-red-500"></div>
              <div className="bg-blue-500"></div>
              <div className="bg-green-500"></div>
              <div className="bg-yellow-400"></div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Ludo;