const CakeRoom = {}; // in-memory game state

module.exports = (io) => {
  io.on("connection", (socket) => {

    console.log("🎂 Cake socket connected:", socket.id);

    // 🟢 JOIN ROOM
    socket.on("cake:join", (roomId) => {
      socket.join(roomId);

      if (!CakeRoom[roomId]) {
        CakeRoom[roomId] = {
          players: [],
          towers: {},
          started: false
        };
      }

      const room = CakeRoom[roomId];

      // add player safely
      if (!room.players.includes(socket.id)) {
        room.players.push(socket.id);
      }

      // initialize tower safely
      if (!room.towers[socket.id]) {
        room.towers[socket.id] = [];
      }

      io.to(roomId).emit("cake:roomUpdate", room);
    });

    // 🍰 ADD CAKE LAYER
    socket.on("cake:addLayer", ({ roomId }) => {
      const room = CakeRoom[roomId];
      if (!room) return;

      if (!room.towers[socket.id]) {
        room.towers[socket.id] = [];
      }

      room.towers[socket.id].push("🍰");

      const opponent = room.players.find(p => p !== socket.id);

      io.to(roomId).emit("cake:update", {
        towers: room.towers,
        opponentTower: opponent ? room.towers[opponent] || [] : []
      });
    });

    // 🏁 END GAME
    socket.on("cake:end", ({ roomId }) => {
      const room = CakeRoom[roomId];
      if (!room) return;

      const [p1, p2] = room.players;

      const t1 = room.towers?.[p1]?.length || 0;
      const t2 = room.towers?.[p2]?.length || 0;

      let winner = null;

      if (t1 > t2) winner = p1;
      else if (t2 > t1) winner = p2;

      io.to(roomId).emit("cake:result", {
        winner,
        towers: room.towers
      });

      // cleanup safely
      delete CakeRoom[roomId];
    });

    // ❌ DISCONNECT SAFE CLEANUP
    socket.on("disconnect", () => {
      console.log("🎂 Cake socket disconnected:", socket.id);

      // optional cleanup from rooms
      for (const roomId in CakeRoom) {
        const room = CakeRoom[roomId];

        room.players = room.players.filter(id => id !== socket.id);

        delete room.towers[socket.id];

        // auto delete empty room
        if (room.players.length === 0) {
          delete CakeRoom[roomId];
        }
      }
    });

  });
};