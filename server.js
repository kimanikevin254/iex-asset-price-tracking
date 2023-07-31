// importing the required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

// Creating the Express Application and HTTP Server:
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// middleware to parse incoming request bodies
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
   // Save the received webhook data
   webhookData = req.body;

   // Send the webhook data to all connected clients
   io.emit("webhookData", webhookData);

   res.sendStatus(200);
});

// run when a client connects
io.on("connection", (socket) => {
   console.log("new WS socket connection");

   socket.emit("message", "Welcome to price analyzer");
});

server.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
