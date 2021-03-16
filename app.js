  
const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

const server = app.listen(
    PORT,
    console.log(
      `Server is runnig on ${process.env.NODE_ENV} mode at port ${PORT}`.yellow
        .bold
    )
  );