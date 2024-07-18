const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const connectDb = require("./controllers/connectDb");
const cors = require("cors");
connectDb();
app.use(express.json());
app.use(cors());
app.use("/api", require("./routes/todoRoutes"));
app.get("/", (rep, res) => {
  res.send("Hello");
});
app.listen(port, () => {
  console.log("server started at port", port);
});
