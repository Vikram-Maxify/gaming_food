require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const dns = require("dns");
const http = require("http");
const { Server } = require("socket.io");

const connectdb = require("./config/database");
const gameSocket = require("./sockets/gameSocket");
const ludoSocket = require("./sockets/ludoSocket");
const carSocket = require("./sockets/carSocket");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// ✅ CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

// ✅ Routes
app.use("/api/auth", require("./route/authRoute"));
app.use("/api/category", require("./route/categoryRoutes"));
app.use("/api/product", require("./route/productRoutes"));
app.use("/api/order", require("./route/orderRoutes"));
app.use("/api/table", require("./route/tableRoutes"));
app.use("/api/cart", require("./route/cart"));

// ✅ Admin Routes
app.use("/api/admin", require("./adminroute/adminRoutes"));
app.use("/api/admin/category", require("./adminroute/categoryRoutes"));
app.use("/api/admin/product", require("./adminroute/productRoutes"));
app.use("/api/admin/order", require("./adminroute/orderRoutes"));
app.use("/api/admin/table", require("./adminroute/tableRoutes"));
app.use("/api/admin/settings", require("./adminroute/adminSettingsRoutes"));

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// 🔥 VERY IMPORTANT (FIX)
app.set("io", io);

// ✅ Global Socket Connection
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // 👑 Admin joins room
  socket.on("joinAdmin", () => {
    socket.join("adminRoom");
    console.log("✅ Admin joined room");
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// 🎮 Other sockets
gameSocket(io);
ludoSocket(io);
carSocket(io);

// ✅ DB + Server start
const port = process.env.PORT || 3000;

connectdb();

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});