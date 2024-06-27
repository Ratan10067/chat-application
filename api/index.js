const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

dotenv.config();

mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;
const app = express();

// Middleware for JSON body parsing
app.use(express.json());

console.log(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const createdUser = await User.create({ username, password });
        jwt.sign({ userId: createdUser._id }, jwtSecret, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json('ok');
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.listen(5174, () => {
    console.log("Server is running on port 5174");
});
