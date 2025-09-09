import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import userRouter from "./userroute/userroute.js";
import messageRouter from "./userroute/messageroute.js";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);


// Initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" }
});

// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;
  // Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
  console.log("User Disconnected", userId);
  delete userSocketMap[userId];
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });



});

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/bitchat/auth", userRouter);
app.use("/bitchat/message", messageRouter);

const PORT = process.env.PORT || 5000;

const run =async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    await mongoose.connect(`${process.env.MONGODBURL}`);
    server.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
}
run();
