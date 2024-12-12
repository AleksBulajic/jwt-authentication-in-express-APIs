// controllers/test-jwt.js

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/sign-token", (req, res) => {
    const user = {
      _id: 1,
      username: "test",
      password: "test",
    };
  
    if (!process.env.SECRET) {
      return res.status(500).json({ error: "Missing SECRET in environment variables." });
    }
  
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: "1h" });
    res.json({ token });
  });



router.post("/verify-token", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // Add in verify method
    const decoded = jwt.verify(token, process.env.SECRET);
    res.json({ decoded });
    console.log("SECRET:", process.env.SECRET);
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
});

module.exports = router;
