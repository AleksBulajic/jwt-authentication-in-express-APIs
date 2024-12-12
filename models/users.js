// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the User model, which outlines the structure of the user documents
const userSchema = new mongoose.Schema({
  // Define a field for 'username' with the type of String
  username: {
    type: String
  },
  // Define a field for 'hashedPassword' with the type of String
  hashedPassword: {
    type: String
  }
});

// Modify the schema to control the JSON output when converting documents to JSON format
userSchema.set('toJSON', {
    // Define a transformation function that is called when a document is converted to JSON
    transform: (document, returnedObject) => {
        // Remove the 'hashedPassword' field from the returned object
        delete returnedObject.hashedPassword;
    }
});

// Create a model called 'User' based on the userSchema
// This will allow us to interact with the 'users' collection in MongoDB
const User = mongoose.model('User', userSchema);

// Export the User model to make it available for use in other parts of the application
module.exports = User;
