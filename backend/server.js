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
    origin: "http://localhost:5173",
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

// ✅ Admin Routes
app.use("/api/admin", require("./adminroute/adminRoutes"));
app.use("/api/admin/category", require("./adminroute/categoryRoutes"));
app.use("/api/admin/product", require("./adminroute/productRoutes"));
app.use("/api/admin/order", require("./adminroute/orderRoutes"));
app.use("/api/admin/table", require("./adminroute/tableRoutes"));

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

gameSocket(io);
ludoSocket(io);
carSocket(io);



// ✅ DB + Server start
const port = process.env.PORT || 3000;

connectdb();

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});