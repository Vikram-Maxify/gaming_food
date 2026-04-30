import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5002");
const roomId = "cake123";

export default function CakeTower() {
  const [joined, setJoined] = useState(false);
  const [cakes, setCakes] = useState([]);
  const [opCakes, setOpCakes] = useState([]);
  const [winner, setWinner] = useState(null);

  const [pos, setPos] = useState(0);
  const direction = useRef(1);
  const requestRef = useRef(null);

  // 🎮 JOIN
  const joinGame = () => {
    socket.emit("cake:join", roomId);
    setJoined(true);
    spawnCake();
  };

  // 🎂 CAKE MOVE ANIMATION (LEFT ↔ RIGHT)
  const animate = () => {
    setPos((prev) => {
      let next = prev + direction.current * 3;

      if (next > 80) direction.current = -1;
      if (next < 0) direction.current = 1;

      return next;
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  const spawnCake = () => {
    cancelAnimationFrame(requestRef.current);
    setPos(0);
    direction.current = 1;
    requestRef.current = requestAnimationFrame(animate);
  };

  // 🧁 PLACE CAKE (CENTER CHECK)
  const placeCake = () => {
    const center = 50; // perfect center
    const offset = Math.abs(pos - center);

    let newCake = {
      pos,
      success: offset < 10, // tolerance
    };

    setCakes((prev) => [...prev, newCake]);

    socket.emit("cake:addLayer", {
      roomId,
      success: newCake.success,
    });

    spawnCake();
  };

  // 🏁 END GAME
  const endGame = () => {
    socket.emit("cake:end", { roomId });
  };

  useEffect(() => {
    socket.on("cake:update", (data) => {
      setOpCakes(data.opponentTower || []);
    });

    socket.on("cake:result", (data) => {
      setWinner(data.winner);
    });

    return () => {
      socket.off("cake:update");
      socket.off("cake:result");
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 flex flex-col items-center p-6">

      <h1 className="text-3xl font-bold mb-4">🎂 Cake Tower Battle</h1>

      {!joined ? (
        <button
          onClick={joinGame}
          className="px-6 py-3 bg-green-500 text-white rounded-xl"
        >
          Join Game
        </button>
      ) : (
        <>
          {/* GAME AREA */}
          <div className="flex gap-10 mt-6 w-full max-w-5xl">

            {/* YOU */}
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-lg">
              <h2 className="text-center font-bold mb-3">You</h2>

              {/* TOWER */}
              <div className="relative h-[350px] border rounded-xl bg-pink-50 overflow-hidden">

                {/* STACKED CAKES */}
                <div className="absolute bottom-0 w-full flex flex-col items-center gap-1">
                  {cakes.map((c, i) => (
                    <div
                      key={i}
                      className={`h-6 w-24 rounded-full ${
                        c.success ? "bg-yellow-400" : "bg-red-400"
                      }`}
                    />
                  ))}
                </div>

                {/* MOVING CAKE */}
                <div
                  className="absolute top-0 h-6 w-24 bg-yellow-500 rounded-full"
                  style={{
                    left: `${pos}%`,
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
            </div>

            {/* OPPONENT */}
            <div className="flex-1 bg-white rounded-2xl p-4 shadow-lg">
              <h2 className="text-center font-bold mb-3">Opponent</h2>

              <div className="h-[350px] border rounded-xl bg-blue-50 flex flex-col justify-end items-center gap-1 p-2">
                {opCakes.map((c, i) => (
                  <div
                    key={i}
                    className="h-6 w-24 rounded-full bg-blue-400"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={placeCake}
              className="px-6 py-3 bg-purple-500 text-white rounded-xl"
            >
              🎯 Place Cake
            </button>

            <button
              onClick={endGame}
              className="px-6 py-3 bg-red-500 text-white rounded-xl"
            >
              🏁 End Game
            </button>
          </div>

          {/* RESULT */}
          {winner && (
            <div className="mt-4 text-xl font-bold">
              🏆 Winner: {winner === socket.id ? "You 🎉" : "Opponent 😈"}
            </div>
          )}
        </>
      )}
    </div>
  );
}