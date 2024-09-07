const express = require('express');
const app = express();
const PORT = 9094;

app.use(express.static('public'));
app.use(express.json());

// Serve the chat page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());

let messages = []; // In-memory storage for simplicity

app.post('/send', (req, res) => {
    const { username, message } = req.body;
    const timestamp = new Date().toLocaleString('en-US', { hour12: true });
    messages.push({ username, message, timestamp }); // Include the timestamp in the message object
    res.sendStatus(200);
});

app.get('/messages', (req, res) => {
    const formattedMessages = messages.map(msg => `${msg.timestamp} ${msg.username}: ${msg.message}`).join('\n');
    res.send(formattedMessages);
});

app.listen(9094, () => console.log('Server running on port 9094'));