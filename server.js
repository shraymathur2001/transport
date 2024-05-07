const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./db'); // Require the User model from db.js
const bcrypt = require('bcrypt');
const fs = require('fs');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


// Endpoint for user registration
app.post('/register', async (req, res) => {
    const { name, email, password, city } = req.body; // Extract name, email, password, and city from the request body

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        } else {
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

            // Create a new user with hashed password
            await User.create({ name, email, city, password: hashedPassword });

            return res.status(201).json({ message: 'Registration successful' });
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Registration failed' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Email does not exist' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }

        // Password is correct, login successful
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});




// Other routes for admin functionalities can be added here
// Endpoint for fetching all users

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


// Endpoint to delete a user by ID
app.delete('/users/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Endpoint for fetching sorted user data by name
// app.get('/users/sortByName', async (req, res) => {
//     try {
//         const sortedUsers = await User.find().collation({locale:'en',strength:2}).sort({ name: 1 }); // Sort by name in ascending order
//         res.status(200).json(sortedUsers);
//     } catch (error) {
//         console.error('Error fetching sorted users:', error);
//         res.status(500).json({ error: 'Failed to fetch sorted users' });
//     }
// });

// Endpoint for fetching sorted user data by name
app.get('/users/sortByName', async (req, res) => {
    try {
        const sortedUsers = await User.find().collation({ locale: 'en', strength: 2 }).sort({ name: 1 }); // Sort by name in ascending order with case-insensitive collation
        res.status(200).json(sortedUsers);
    } catch (error) {
        console.error('Error fetching sorted users:', error);
        res.status(500).json({ error: 'Failed to fetch sorted users' });
    }
});


// Endpoint for forget password
app.post('/forgetpassword', async (req, res) => {

    const { email, newPassword, confirmPassword } = req.body;

    try {
        // Check if email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Email does not exist' });
        }

        // Check if newPassword matches confirmPassword
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'New password and confirm password do not match' });
        }

        // Hash the new password before updating it in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the saltRounds
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Failed to update password' });
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Endpoint for sending message to users
app.post('/users/sendMessage', async (req, res) => {
    const { message } = req.body;

    try {
        // Find the user with the email id "admin@123"
        const user = await User.findOne({ email: 'admin@123' });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Push the new message to the user's messages array
        user.messages.push({ message: message });
        await user.save();
        
        res.status(200).json({ message: 'Message sent to admin user successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message to admin user' });
    }
});



app.get('/messages', async (req, res) => {
    try {
        // Query the database to retrieve messages sent by the admin
        const admin = await User.findOne({ email: 'admin@123' }, { _id: 0, messages: 1 });
        if (admin && admin.messages) {
            res.status(200).json(admin.messages);
        } else {
            res.status(200).json([]); // Send an empty array if no messages found
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});


// Endpoint for deleting a message by ID
app.delete('/messages/:messageId', async (req, res) => {
    const messageId = req.params.messageId;

    try {
        // Find the user who sent the message
        const user = await User.findOne({ email: 'admin@123' });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the message from the user's messages array
        const index = user.messages.findIndex(msg => msg._id.toString() === messageId);
        if (index === -1) {
            return res.status(404).json({ error: 'Message not found' });
        }
        user.messages.splice(index, 1);
        await user.save();

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

