// Import mongoose
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  hashedPassword:{
    type: String
  }

});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;