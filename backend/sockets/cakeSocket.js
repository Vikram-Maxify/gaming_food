const CakeRoom = {}; // in-memory (fast gameplay state)

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

      if (!CakeRoom[roomId].players.includes(socket.id)) {
        CakeRoom[roomId].players.push(socket.id);
        CakeRoom[roomId].towers[socket.id] = [];
      }

      io.to(roomId).emit("cake:roomUpdate", CakeRoom[roomId]);
    });

    // 🍰 ADD CAKE LAYER
    socket.on("cake:addLayer", ({ roomId }) => {
      const room = CakeRoom[roomId];
      if (!room) return;

      room.towers[socket.id].push("🍰");

      const opponent = room.players.find(p => p !== socket.id);

      io.to(roomId).emit("cake:update", {
        towers: room.towers,
        opponentTower: room.towers[opponent] || []
      });
    });

    // 🏁 END GAME
    socket.on("cake:end", ({ roomId }) => {
      const room = CakeRoom[roomId];
      if (!room) return;

      let winner = null;

      const [p1, p2] = room.players;

      const t1 = room.towers[p1]?.length || 0;
      const t2 = room.towers[p2]?.length || 0;

      if (t1 > t2) winner = p1;
      else if (t2 > t1) winner = p2;

      io.to(roomId).emit("cake:result", {
        winner,
        towers: room.towers
      });

      delete CakeRoom[roomId];
    });

    socket.on("disconnect", () => {
      console.log("🎂 Cake socket disconnected:", socket.id);
    });
  });
};