// Import necessary libraries
const express = require('express');
const router = express.Router();
const User = require('../models/users');  // Import the User model to interact with the database
const verifyToken = require('../middleware/verify-token');  // Import the verifyToken middleware for token validation

// Define the GET route to retrieve a user's profile by ID
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        // Check if the authenticated user ID matches the requested user ID
        // This ensures that a user can only access their own profile
        if (req.user._id !== req.params.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Find the user in the database using the provided userId
        const user = await User.findById(req.params.userId);
        
        // If no user is found, send a 404 error
        if (!user) {
            res.status(404);
            throw new Error('Profile not found.');
        }

        // If the user is found, return the user data as a JSON response
        res.json({ user });
    } catch (error) {
        // If an error occurs, handle it based on the error type
        // If the status is 404, send a 404 error with the error message
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
            // For other errors, send a 500 error with the error message
            res.status(500).json({ error: error.message });
        }
    }
});

// Export the router so it can be used in the main app
module.exports = router;
