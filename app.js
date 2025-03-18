const express = require('express');
const path = require('path');
const { connect } = require('./config/db');
const route = require('./routes/route');
const http = require('http'); // Add this
const socketIo = require('socket.io'); // Add this

const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server (required for Socket.IO)
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
connect();

// Make io accessible throughout the application
app.set('io', io);

// Routes
app.use('/', route);

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A client connected');
    
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Add this with other requires
const dataPoll = require('./dataPoll');

// Update the server listen section
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Start data polling after server starts
    const pollInterval = dataPoll.startPolling(io, 10000); // Poll every 10 seconds
    app.set('polling', pollInterval);
});

module.exports = app;