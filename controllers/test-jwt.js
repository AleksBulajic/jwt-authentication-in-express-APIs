// Import necessary libraries for routing and JWT handling
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Route to sign and generate a JWT token
router.get("/sign-token", (req, res) => {
    // Define a user object with example data (normally you'd use real user data)
    const user = {
      _id: 1,
      username: "test",
      password: "test",
    };
  
    // Check if the SECRET key is available in the environment variables
    if (!process.env.SECRET) {
      // If the SECRET key is missing, respond with an error message (HTTP 500: Internal Server Error)
      return res.status(500).json({ error: "Missing SECRET in environment variables." });
    }
  
    // Generate a JWT token using the user object, the SECRET key, and set the token to expire in 1 hour
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: "1h" });
    
    // Send the generated token in the response
    res.json({ token });
  });

// Route to verify the validity of a JWT token
router.post("/verify-token", (req, res) => {
  try {
    // Extract the token from the Authorization header of the incoming request
    // The token is usually passed in the format: 'Bearer <token>'
    const token = req.headers.authorization.split(" ")[1];
    
    // Use jwt.verify to verify and decode the token using the SECRET key
    const decoded = jwt.verify(token, process.env.SECRET);
    
    // If verification is successful, send back the decoded payload as the response
    res.json({ decoded });
    
    // Log the SECRET value for debugging purposes (this could be sensitive information, avoid in production)
    console.log("SECRET:", process.env.SECRET);
  } catch (error) {
    // If there's an error (e.g., token is invalid or expired), send a 401 Unauthorized response
    res.status(401).json({ error: "Invalid token." });
  }
});

// Export the router to be used in other parts of the application
module.exports = router;
