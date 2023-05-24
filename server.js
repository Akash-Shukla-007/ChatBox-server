const express = require("express");
const chats = require("./data/data");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoutes = require("./Routes/UserRoutes");
const ChatRoutes = require("./Routes/ChatRoutes");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use("/api/user", UserRoutes);
app.use("/api/chat", ChatRoutes);

app.get("/", (req, res) => {
  res.send("app running");
});

app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/chat-box");
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("Database connected");
  app.listen(8080, () => {
    console.log(`server running at port ${process.env.PORT}`);
  });
});
