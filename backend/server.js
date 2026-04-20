require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const dns = require("dns");
const connectdb = require("./congif/database");
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


// admin

app.use("/api/admin/category", require("./adminroute/categoryRoutes"));
app.use("/api/admin/product", require("./adminroute/productRoutes"));



const port = process.env.PORT || 3000;
connectdb()
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});