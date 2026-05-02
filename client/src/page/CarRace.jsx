import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("devine.trueprofit.biz", {
  withCredentials: true,
});

const CarRace = () => {
  const [game, setGame] = useState(null);
  const [tableId, setTableId] = useState("");
  const [userId, setUserId] = useState("");

  const join = () => {
    socket.emit("joinCar", { tableId, userId });
  };

  useEffect(() => {
    socket.on("carUpdate", setGame);

    socket.on("errorMessage", (msg) => {
      alert(msg);
    });

    return () => {
      socket.off("carUpdate");
      socket.off("errorMessage");
    };
  }, []);

  const accelerate = () => {
    socket.emit("accelerate", {
      gameId: game._id,
      userId,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">

      <h1 className="text-3xl mb-4">🚗 Car Racing</h1>

      {!game && (
        <div className="bg-gray-800 p-5 rounded w-80">
          <input
            className="w-full p-2 mb-2 bg-gray-700"
            placeholder="Table ID"
            onChange={(e) => setTableId(e.target.value)}
          />
          <input
            className="w-full p-2 mb-3 bg-gray-700"
            placeholder="User ID"
            onChange={(e) => setUserId(e.target.value)}
          />

          <button
            onClick={join}
            className="w-full bg-blue-600 p-2"
          >
            Join Race
          </button>
        </div>
      )}

      {game && (
        <div className="w-full max-w-2xl">

          <p>Status: {game.status}</p>

          {game.players.map((p, i) => (
            <div key={i} className="bg-gray-800 my-4 p-3 rounded">

              {/* Track */}
              <div className="relative w-full h-16 bg-gray-700 rounded overflow-hidden">

                {/* Road Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white opacity-30"></div>

                {/* Car Image */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
                  alt="car"
                  className="absolute top-2 h-12 transition-all duration-300 ease-linear"
                  style={{
                    left: `${p.progress}%`,
                    transform: "scaleX(-1)" // 👈 yeh add karo
                  }}
                />
              </div>

            </div>
          ))}

          {game.status === "playing" && (
            <button
              onClick={accelerate}
              className="bg-yellow-500 text-black px-4 py-2 mt-3"
            >
              Accelerate 🚀
            </button>
          )}

          {game.winner && (
            <h2 className="text-green-400 mt-3">
              Winner: {game.winner}
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default CarRace;