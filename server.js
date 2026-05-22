const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.json({ message: "Smart Healthcare API is running locally!" });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments')); 

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 Local MongoDB connected successfully."))
    .catch(err => console.error("❌ Database connection error: ", err));

app.listen(PORT, () => {
    console.log(`🌐 Server operating on port ${PORT}`);
});