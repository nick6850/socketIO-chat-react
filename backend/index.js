const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    io.to(message.room).emit("newMessage", message);
  });

  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);
    socket.emit("newMessage", {
      message: "Welcome to the chat!",
      username: "Chatbot",
    });
    socket.to(room).emit("newMessage", {
      message: `${username} has joined the chat.`,
      username: "Chatbot",
    });

    socket.data.userCredentials = { room, username };
  });

  socket.on("disconnect", () => {
    socket.to(socket.data.userCredentials.room).emit("newMessage", {
      message: `${socket.data.userCredentials.username} has left the chat`,
      username: "Chatbot",
    });
  });
});

server.listen(3000, () => console.log("Server is running on port 3000"));
