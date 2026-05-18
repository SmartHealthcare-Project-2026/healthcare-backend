const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Standard Middlewares
app.use(cors());
app.use(express.json());

// Basic Route for Testing
app.get('/', (req, res) => {
    res.json({ message: "Smart Healthcare Native API is running smoothly." });
});

// Database Connection Logic
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 MongoDB Atlas cloud cluster connected successfully."))
    .catch(err => console.error("❌ Database connection error: ", err));

app.listen(PORT, () => {
    console.log(`🌐 Server safely operating on port ${PORT}`);
});
