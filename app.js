const express = require('express');
const path = require('path');
const { connect } = require('./config/db');
const route = require('./routes/route');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
connect();

// Routes
app.use('/', route);

//response time middleware
// Route to measure response time
app.get('/', (req, res) => {
    console.log('Request received at /api/data'); // Debugging line
    const start = Date.now(); // Start time

    // Simulate some processing
    const data = { message: 'Hello, world!' };

    const end = Date.now(); // End time
    const responseTime = end - start; // Calculate response time in milliseconds
    console.log(`Response Time: ${responseTime} ms`);

    res.json(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;