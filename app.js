const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('New user connected');

    // Listen for incoming messages
    socket.on('message', (msg) => {
        io.emit('message', msg);  // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
