// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// require("dotenv").config();
// const STRING2 = "mongodb+srv://mohamedyoosuf2001:BvWSEKLCm14nihZ4@clusterrifah.o2i6ml8.mongodb.net/RifahMembers";
// const User = require("./model/login"); // Adjust path if needed

// const seedUsers = async () => {
//   try {
//     await mongoose.connect(STRING2);
//     console.log("Connected to MongoDB");

//     // Create admin user (your existing logic)
//     const existingAdmin = await User.findOne({ username: "yoosuf" });
//     if (existingAdmin) {
//       console.log("Admin already exists");
//     } else {
//       const hashedPassword = await bcrypt.hash("yoosufpwd", 10);
//       const admin = new User({
//         username: "yoosuf",
//         password: hashedPassword,
//         role: "Admin",
//       });
//       await admin.save();
//       console.log("✅ Admin user created: username: yoosuf, password: yoosufpwd");
//     }

//     // Create 10 additional users
//     const users = Array.from({ length: 10 }, (_, index) => ({
//       username: `user${index + 1}`, // e.g., user1, user2, ..., user10
//       password: `user${index + 1}pwd`, // e.g., user1pwd, user2pwd, ..., user10pwd
//       role: "Member", // Default role for new users
//     }));

//     for (const user of users) {
//       const existingUser = await User.findOne({ username: user.username });
//       if (existingUser) {
//         console.log(`Username ${user.username} already exists, skipping...`);
//         continue;
//       }

//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       const newUser = new User({
//         username: user.username,
//         password: hashedPassword,
//         role: user.role,
//       });
//       await newUser.save();
//       console.log(`✅ User created: username: ${user.username}, password: ${user.password}`);
//     }

//     console.log("All users added successfully!");
//     process.exit(0);
//   } catch (err) {
//     console.error("Error seeding users:", err);
//     process.exit(1);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// seedUsers();




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
