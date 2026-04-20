require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const dns = require("dns");
const connectdb = require("./config/database");
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies / auth headers
  })
); app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

app.use("/api/auth", require("./route/authRoute"));
app.use("/api/category", require("./route/categoryRoutes"));
app.use("/api/product", require("./route/productRoutes"));
app.use("/api/order", require("./route/orderRoutes"));


// admin

app.use("/api/admin", require("./adminroute/adminRoutes"));
app.use("/api/admin/category", require("./adminroute/categoryRoutes"));
app.use("/api/admin/product", require("./adminroute/productRoutes"));
app.use("/api/admin/order", require("./adminroute/orderRoutes"));



const port = process.env.PORT || 3000;
connectdb()
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});