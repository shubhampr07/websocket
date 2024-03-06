const express = require("express");
const app = express();
const path = require("path");
const http = require('http');
const {Server} = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")))
app.get('/', (req, res) => {
    res.sendFile("/public/index.html");
  });

io.on('connection', (socket) => {
    console.log("a user connected.");
    socket.on('newMessage', (message) => {
        io.emit('message', message);
    })
})
  
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });