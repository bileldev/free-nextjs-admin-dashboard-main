const express = require("express");
const app = express();

const http = require("http");

const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
    origin: "http://localhost:3002",
    //methods: ["GET", "POST", "PUT"]
    }
});
/*
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("chat message", (message) => {
    io.emit("chat message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
*/
/*io.on("connection", (socket) => {
    console.log(` user connected: ${socket.id}`);
    socket.on("send_Message", (data) => {
        //console.log("data",data);
        socket.broadcast.emit("received_message", data); 
        console.log("data",data);  });
        
});  

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});*/


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  });
  
  server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
  });
