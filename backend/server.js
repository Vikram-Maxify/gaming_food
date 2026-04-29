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
const cakeSocket = require("./sockets/cakeSocket");

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
app.use("/api/notification", require("./route/userNotificationRoutes"));
app.use("/api/promo", require("./route/userPromoRoutes"));
app.use("/api/chef", require("./route/chefRoutes"));



// ✅ Admin Routes
app.use("/api/admin", require("./adminroute/adminRoutes"));
app.use("/api/admin/category", require("./adminroute/categoryRoutes"));
app.use("/api/admin/product", require("./adminroute/productRoutes"));
app.use("/api/admin/order", require("./adminroute/orderRoutes"));
app.use("/api/admin/table", require("./adminroute/tableRoutes"));
app.use("/api/admin/settings", require("./adminroute/adminSettingsRoutes"));
app.use("/api/admin/banner", require("./adminroute/adminBannerRoutes"));
app.use("/api/admin/notification", require("./adminroute/adminNotificationRoutes"));
app.use("/api/admin/promo", require("./adminroute/adminPromoRoutes"));

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

// 🔥 Make io globally accessible
app.set("io", io);

// ✅ Socket Connection
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  // 👤 USER ROOM
  socket.on("joinUser", (userId) => {
    socket.join(userId);
    console.log("✅ User joined:", userId);
  });

  // 👑 ADMIN ROOM
  socket.on("joinAdmin", () => {
    socket.join("adminRoom");
    console.log("✅ Admin joined");
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
  });
});

// 🎮 Other sockets
gameSocket(io);
ludoSocket(io);
carSocket(io);
cakeSocket(io);   // 🔥 ADD THIS

// ✅ DB + Server
const port = process.env.PORT || 3000;

connectdb();

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});