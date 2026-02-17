// const express = require('express');
// const router = express.Router();
// const { login, logOut, check, register, getAllUser } = require("../controller/login");
// const verifyToken = require('../middleware/auth');
// const authorizeRoles = require('../middleware/authorize');

// // --- NEW IMPORTS FOR GOOGLE AUTH ---
// const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');
// // 👇 CHECK THIS PATH: Make sure it points to your actual Member/User model file
// const User = require('../model/member'); 

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// // -----------------------------------

// // Public Routes
// router.post("/login", login);
// router.post("/logout", logOut);

// // Protected Routes
// router.get("/check", verifyToken, check);

// // Admin Routes
// router.post("/register", verifyToken, authorizeRoles('Admin'), register);
// router.get("/getUser", verifyToken, authorizeRoles("Admin"), getAllUser);


// // ==========================================
// // 👇 NEW GOOGLE AUTH ROUTE
// // ==========================================
// router.post("/google", async (req, res) => {
//     const { token } = req.body;
  
//     try {
//       // 1. Verify the token with Google
//       const ticket = await client.verifyIdToken({
//           idToken: token,
//           audience: process.env.GOOGLE_CLIENT_ID, 
//       });
      
//       // 2. Get user info from the payload
//       const payload = ticket.getPayload();
//       const { email, name, picture, sub } = payload; 
  
//       // 3. Check if user exists in your DB
//       // We look for a user with this email
//       let user = await User.findOne({ email });
  
//       if (!user) {
//         // 4. If new user, create them automatically
//         user = await User.create({
//           email: email,
//           name: name,
//           googleId: sub, 
//           role: 'member', // Default role for new Google users
//           // If your model has a field for profile image, save it here:
//           // profileImage: picture 
//         });
//       }
  
//       // 5. Generate YOUR app's session token
//       const sessionToken = jwt.sign(
//         { userId: user._id, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: '1d' }
//       );
  
//       // 6. Send response (Set cookie + JSON)
//       res.cookie('token', sessionToken, { 
//           httpOnly: true,
//           secure: process.env.NODE_ENV === 'production', // Secure in production
//           sameSite: 'strict'
//       }); 
      
//       res.status(200).json({ 
//         success: true,
//         user: { 
//             userId: user._id, 
//             role: user.role, 
//             name: user.name,
//             email: user.email
//         },
//         token: sessionToken 
//       });
  
//     } catch (error) {
//       console.error("Google Auth Error:", error);
//       res.status(400).json({ message: "Google Login Failed", error: error.message });
//     }
//   });

// module.exports = router;

//--------------17/02-----------------11.24-----------------

const express = require('express');
const router = express.Router();
const { login, register, getAllUser, check } = require("../controller/login"); // Removed 'logOut' from import since we define it below
const verifyToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorize');

// --- NEW IMPORTS FOR GOOGLE AUTH ---
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../model/member'); 

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// -----------------------------------

// Public Routes
router.post("/login", login);

// ✅ FIX: LOGOUT CRASH (Error 500)
// We define the logout logic directly here to ensure the callback is handled correctly.
router.post("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        
        // Destroy session if it exists
        req.session.destroy((err) => {
            if (err) console.log("Session destroy error:", err);
            res.clearCookie("connect.sid"); // Adjust if your cookie name is different
            res.status(200).json({ message: "Logged out successfully" });
        });
    });
});

// Protected Routes
router.get("/check", verifyToken, check);

// Admin Routes
router.post("/register", verifyToken, authorizeRoles('Admin'), register);
router.get("/getUser", verifyToken, authorizeRoles("Admin"), getAllUser);


// ==========================================
// GOOGLE AUTH ROUTE
// ==========================================
router.post("/google", async (req, res) => {
    const { token } = req.body;
  
    try {
      // 1. Verify the token with Google
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID, 
      });
      
      // 2. Get user info
      const payload = ticket.getPayload();
      const { email, name, picture, sub } = payload; 
  
      // 3. Check if user exists
      let user = await User.findOne({ email });
  
      if (!user) {
        user = await User.create({
          email: email,
          name: name,
          googleId: sub, 
          role: 'member', 
        });
      }
  
      // 4. Generate Token
      const sessionToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      // 5. Send response
      res.cookie('token', sessionToken, { 
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'strict'
      }); 
      
      res.status(200).json({ 
        success: true,
        user: { 
            userId: user._id, 
            role: user.role, 
            name: user.name,
            email: user.email
        },
        token: sessionToken 
      });
  
    } catch (error) {
      console.error("Google Auth Error:", error);
      res.status(400).json({ message: "Google Login Failed", error: error.message });
    }
  });

module.exports = router;