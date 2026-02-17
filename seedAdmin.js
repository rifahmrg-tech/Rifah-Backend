// seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require('./config/connectionDB');
const User = require("./model/login");
require("dotenv").config();

const seedUsers = async () => {
  try {
    await connectDB();
    
    const adminUsername = process.env.ADMIN_USER || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "adminpwd";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminData = {
      username: adminUsername,
      password: hashedPassword,
      role: "Admin",
    };

    // This updates the admin if they exist, or creates them if they don't
    await User.findOneAndUpdate({ username: adminUsername }, adminData, { upsert: true, new: true });
    
    console.log(`✅ Admin user synchronized: ${adminUsername}`);
  } catch (err) {
    console.error("❌ Error seeding users:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();