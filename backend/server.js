require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const dns = require("dns");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const connectdb = require("./config/database");

// sockets
const gameSocket = require("./sockets/gameSocket");
const ludoSocket = require("./sockets/ludoSocket");
const carSocket = require("./sockets/carSocket");
const cakeSocket = require("./sockets/cakeSocket");

// optional DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();


// ================== CORS ================== //
app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);


// ================== MIDDLEWARE ================== //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());


// ================== ROUTES ================== //

// User
app.use("/api/auth", require("./route/authRoute"));
app.use("/api/category", require("./route/categoryRoutes"));
app.use("/api/product", require("./route/productRoutes"));
app.use("/api/order", require("./route/orderRoutes"));
app.use("/api/table", require("./route/tableRoutes"));
app.use("/api/cart", require("./route/cart"));
app.use("/api/notification", require("./route/userNotificationRoutes"));
app.use("/api/promo", require("./route/userPromoRoutes"));
app.use("/api/chef", require("./route/chefRoutes"));
app.use("/api/chef/item-preparation", require("./adminroute/itemPreparationRoutes"));

// Admin
app.use("/api/admin", require("./adminroute/adminRoutes"));
app.use("/api/admin/category", require("./adminroute/categoryRoutes"));
app.use("/api/admin/product", require("./adminroute/productRoutes"));
app.use("/api/admin/order", require("./adminroute/orderRoutes"));
app.use("/api/admin/table", require("./adminroute/tableRoutes"));
app.use("/api/admin/settings", require("./adminroute/adminSettingsRoutes"));
app.use("/api/admin/banner", require("./adminroute/adminBannerRoutes"));
app.use("/api/admin/notification", require("./adminroute/adminNotificationRoutes"));
app.use("/api/admin/promo", require("./adminroute/adminPromoRoutes"));
app.use("/api/admin/chef", require("./adminroute/chefRoutes"));


// ================== SERVER ================== //

const server = http.createServer(app);


// ================== SOCKET ================== //

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL?.split(",") || [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  },
});

app.set("io", io);


// ================== SOCKET CONNECTION ================== //

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("joinUser", (userId) => {
    socket.join(userId);
    console.log("✅ User joined:", userId);
  });

  socket.on("joinAdmin", () => {
    socket.join("adminRoom");
    console.log("✅ Admin joined");
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);
  });
});


// ================== STATIC FILES ================== //

// Admin
app.use("/admin", express.static(path.join(__dirname, "../admin/dist")));

// Chef
app.use("/chef", express.static(path.join(__dirname, "../chef_app/dist")));

// Client
app.use("/", express.static(path.join(__dirname, "../client/dist")));


// ================== SAFE FALLBACK (EXPRESS V5 FIX) ================== //

app.get(/^\/.*/, (req, res, next) => {
  // ❌ skip APIs
  if (req.path.startsWith("/api")) return next();

  // ❌ skip static files (.js, .css, images, etc.)
  if (req.path.includes(".")) return next();

  // ✅ route based on path
  if (req.path.startsWith("/admin")) {
    return res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
  }

  if (req.path.startsWith("/chef")) {
    return res.sendFile(path.join(__dirname, "../chef_app/dist/index.html"));
  }

  // default → client
  return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});


// ================== SOCKET MODULES ================== //

gameSocket(io);
ludoSocket(io);
carSocket(io);
cakeSocket(io);


// ================== DB + START ================== //

const port = process.env.PORT || 3000;

connectdb();

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});