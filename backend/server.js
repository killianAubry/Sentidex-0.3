const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

// Mock price generator
let currentPrice = 7.5520;
const generatePrice = () => {
  const change = (Math.random() - 0.5) * 0.01;
  currentPrice += change;
  return {
    time: Math.floor(Date.now() / 1000),
    open: currentPrice - (Math.random() * 0.005),
    high: currentPrice + (Math.random() * 0.005),
    low: currentPrice - (Math.random() * 0.005),
    close: currentPrice + (Math.random() * 0.005),
    value: currentPrice
  };
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send initial price stream
  const interval = setInterval(() => {
    socket.emit('price_update', generatePrice());
  }, 2000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
