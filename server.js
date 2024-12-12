// Import the dotenv library to manage environment variables
const dotenv = require('dotenv');
// Load environment variables from a .env file into process.env
dotenv.config();

// Import the Express library to create a web server
const express = require('express');
// Create an Express application
const app = express();

// Import the Mongoose library for interacting with MongoDB
const mongoose = require('mongoose');

// Import route handlers from other files
const testJWTRouter = require('./controllers/test-jwt'); // Handles routes related to JWT testing
const usersRouter = require('./controllers/users'); // Handles routes related to user operations
const profilesRouter = require('./controllers/profile.js'); // Handles routes related to profiles

// Define the port for the application to listen on, defaulting to 3000 if not specified in the environment
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database using a connection string from environment variables
mongoose.connect(process.env.MONGODB_URI);

// Set up an event listener to log when the database connection is successful
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse incoming JSON data in requests
app.use(express.json());

// Define routes for different functionalities
app.use('/test-jwt', testJWTRouter); // Mount routes from testJWTRouter at /test-jwt
app.use('/users', usersRouter); // Mount routes from usersRouter at /users
app.use('/profiles', profilesRouter); // Mount routes from profilesRouter at /profiles

// Start the Express application, listening on the specified port
app.listen(PORT, () => {
  console.log(`The express app is ready!, http://localhost:${PORT}`);
});
