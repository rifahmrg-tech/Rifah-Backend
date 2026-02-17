const User = require("../model/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Determine environment
const isProd = process.env.NODE_ENV === 'production';

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Login failed: Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1d" });

    // SETTING THE COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,           // False for local HTTP
      sameSite: isProd ? "None" : "Lax", 
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
      message: "Login successful",
      user: { username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout Logic
exports.logOut = (req, res) => {
  try {
    // We must mirror the cookie settings to successfully clear it
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

// Check User Status (Used by verifyToken middleware)
exports.check = (req, res) => {
  // If the request reaches here, the middleware has already verified the token
  res.status(200).json({ 
    message: "User is authenticated", 
    user: req.user 
  });
};

// Register User (Admin Only)
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || "Member",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Get All Users (Admin Only)
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

//------------------------------10/02------------------------1.55---------------------------


// ... include other exports (logOut, check, register) from previous response