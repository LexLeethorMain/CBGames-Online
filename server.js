const express = require('express');
const path = require('path');
const app = express();
const PORT = 9094;

// Serve all files and subdirectories from the directory where the app is located
app.use(express.static(__dirname));
app.use(express.json());

// Serve the new chat page (in the same directory as server.js)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve new index.html
});

let messages = []; // In-memory storage for simplicity

// Endpoint for posting a new message
app.post('/send', (req, res) => {
    const { username, message } = req.body;
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: true }); // Get only the time
    messages.push({ username, message, timestamp });
    res.sendStatus(200);
});

// Endpoint to retrieve messages
app.get('/messages', (req, res) => {
    const formattedMessages = messages.map(msg => `${msg.timestamp} ${msg.username}: ${msg.message}`).join('\n');
    res.send(formattedMessages);
});

// Start server
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
