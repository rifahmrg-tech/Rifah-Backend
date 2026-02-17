const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
//const User = require('../models/User'); // Your User model

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    // 1. Verify the token with Google
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, 
    });
    
    // 2. Get user info from the payload
    const payload = ticket.getPayload();
    const { email, name, picture, sub } = payload; // 'sub' is Google's unique user ID

    // 3. Check if user exists in your DB
    let user = await User.findOne({ email });

    if (!user) {
      // 4. If new user, create them automatically
      user = await User.create({
        email,
        name,
        googleId: sub, // Store this to link accounts later
        role: 'member', // Default role
        profileImage: picture
      });
    }

    // 5. Generate YOUR app's session token (just like normal login)
    const sessionToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 6. Send back the same structure your AuthContext expects
    res.cookie('token', sessionToken, { httpOnly: true }); // If using cookies
    res.status(200).json({ 
      user: { userId: user._id, role: user.role, name: user.name },
      token: sessionToken 
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(400).json({ message: "Invalid Google Token" });
  }
});

module.exports = router;