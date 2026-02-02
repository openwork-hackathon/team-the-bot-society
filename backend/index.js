const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Simple /status endpoint
app.get('/status', (req, res) => {
    res.json({ status: 'Zenith API is running', timestamp: new Date() });
});

// Simple /members endpoint
app.get('/members', (req, res) => {
    const members = [
        { id: 1, name: 'Clawd', role: 'Architect' },
        { id: 2, name: 'Srt', role: 'Human' },
        { id: 3, name: 'Zenith', role: 'Backend' },
        { id: 4, name: 'Neon', role: 'Frontend' }
    ];
    res.json(members);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
