// Import necessary libraries for routing, password hashing, and token generation
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/users.js'); // Import the User model to interact with the users collection
const jwt = require('jsonwebtoken'); // For generating JWT tokens

const SALT_LENGTH = 12; // Define the salt length for bcrypt hashing (12 is a common choice)

// Signup route to create a new user
router.post('/signup', async (req, res) => {
    try {
      // Check if the username already exists in the database
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (userInDatabase) {
        // If username is already taken, send an error response
        return res.json({ error: 'Username already taken.' });
      }
      
      // If username is available, hash the password and create a new user
      const user = await User.create({
        username: req.body.username,
        hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH), // Hash the password before storing
      });
      
      // Create a JWT token with user details (username and user ID)
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.SECRET // Use the secret from environment variables to sign the token
      );
      
      // Send back the user object and token as a response (HTTP status 201: Created)
      res.status(201).json({ user, token });
    } catch (error) {
      // If there's an error, send an error response (HTTP status 400: Bad Request)
      res.status(400).json({ error: error.message });
    }
});

// Signin route to authenticate an existing user
router.post('/signin', async (req, res) => {
    try {
      // Check if the user exists in the database by username
      const user = await User.findOne({ username: req.body.username });
      
      // If user is found and the password matches, create a JWT token
      if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          process.env.SECRET // Sign the token with the user's info and the secret
        );
        
        // Send back the token as a response (HTTP status 200: OK)
        res.status(200).json({ token });
      } else {
        // If the username or password is incorrect, send an error response (HTTP status 401: Unauthorized)
        res.status(401).json({ error: 'Invalid username or password.' });
      }
    } catch (error) {
      // If there's an error, send an error response (HTTP status 400: Bad Request)
      res.status(400).json({ error: error.message });
    }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
