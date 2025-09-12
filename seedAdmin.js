



const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const STRING2 = "mongodb+srv://mohamedyoosuf2001:BvWSEKLCm14nihZ4@clusterrifah.o2i6ml8.mongodb.net/RifahMembers";

const User = require("./model/login");     // Adjust the path to your User model
const Member = require("./model/RifahMembers");  // Adjust path to your Member model

const seedUsers = async () => {
  try {
    await mongoose.connect(STRING2);
    console.log("✅ Connected to MongoDB");

    // Admin user
    const existingAdmin = await User.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists");
    } else {
      const hashedPassword = await bcrypt.hash("adminpwd", 10);
      const admin = new User({
        username: "admin",
        password: hashedPassword,
        role: "Admin",
      });
      await admin.save();
      console.log("✅ Admin user created: username: yoosuf, password: yoosufpwd");
    }

    

  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
