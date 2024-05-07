const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define schema for user data
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    messages: [{
        sender: String,
        message: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, { collection: 'users' });

// MongoDB connection string
const connectionString = 'mongodb+srv://gamingwork:Moatlas@cluster0.9bc5cxy.mongodb.net/userdata?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Event handlers for database connection
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
