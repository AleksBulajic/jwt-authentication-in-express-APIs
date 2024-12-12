// Import the jwt (JSON Web Token) library to use the 'verify' method for verifying tokens
const jwt = require('jsonwebtoken');

// Define the middleware function to verify the token
function verifyToken(req, res, next) {
  try {
    // Retrieve the token from the Authorization header of the incoming request
    // The token is usually sent in the format: 'Bearer <token>'
    const token = req.headers.authorization.split(' ')[1];

    // Use the 'verify' method from jwt to decode and verify the token
    // 'process.env.SECRET' is the secret key used to validate the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Assign the decoded token payload (which may contain user info) to req.user
    // This allows subsequent middleware or route handlers to access the user data
    req.user = decoded;

    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs (e.g., invalid token), send a 401 Unauthorized response
    // with a message indicating that the token is invalid
    res.status(401).json({ error: 'Invalid token.' });
  }
}

// Export the verifyToken middleware function so it can be used in other files
module.exports = verifyToken;
