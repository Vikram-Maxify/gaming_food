require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");
const connectdb = require("./congif/database");
dns.setServers(["1.1.1.1","8.8.8.8"]);
const app = express();



const port = process.env.PORT || 3000;


connectdb()
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});