const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Replace with your MongoDB URI or use .env
const MONGO_URI = "mongodb://rifahmrg_db_user:rifah2026@cluster0-shard-00-00.qg8svfy.mongodb.net:27017,cluster0-shard-00-01.qg8svfy.mongodb.net:27017,cluster0-shard-00-02.qg8svfy.mongodb.net:27017/RifahMembers?ssl=true&replicaSet=atlas-cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

// Import your models
const Member = require("./model/RifahMembers"); // Adjust path
const User = require("./model/login");   // Adjust path

// Utility to generate username and password
const generateCredentials = (index) => {
  const username = `user${index + 1}`;       // e.g., user1, user2, ...
  const password = `user${index + 1}pwd`;    // e.g., user1pwd, ...
  return { username, password };
};

const seedUsersForMembers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const members = await Member.find().limit(10);
    if (members.length === 0) {
      console.warn("⚠️ No members found.");
      return;
    }

    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const { username, password } = generateCredentials(i);

      // Check if user already exists
      const existingUser = await User.findOne({ memberId: member._id });
      if (existingUser) {
        console.log(`🔁 User for member ${member.name} already exists. Skipping.`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
        role: "Member",
        memberId: member._id,
      });

      await newUser.save();
      console.log(`✅ Created user for member: ${member.name}`);
      console.log(`   Username: ${username}, Password: ${password}`);
    }

    console.log("🎉 All users created for first 10 members!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.connection.close();
  }
};

seedUsersForMembers();
