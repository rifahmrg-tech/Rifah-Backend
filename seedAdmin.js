const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const STRING2 ="mongodb+srv://mohamedyoosuf2001:BvWSEKLCm14nihZ4@clusterrifah.o2i6ml8.mongodb.net/RifahMembers";
const User = require("./model/login"); // adjust path if needed

const seedAdmin = async () => {
  try {
    await mongoose.connect(STRING2);

    const existing = await User.findOne({ username: "yoosuf" });
    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("yoosufpwd", 10);

    const admin = new User({
      username: "yoosuf",
      password: hashedPassword,
      role: "Admin",
    });

    await admin.save();
    console.log("✅ Member user created: username: member, password: member@omt45");
    process.exit(0);
  } catch (err) {

    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
