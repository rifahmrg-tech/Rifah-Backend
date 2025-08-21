const mongoose = require("mongoose");
const Member = require("./model/RifahMembers");

mongoose.connect("mongodb+srv://mohamedyoosuf2001:BvWSEKLCm14nihZ4@clusterrifah.o2i6ml8.mongodb.net/RifahMembers", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seed = async () => {
  try {
    await Member.deleteMany(); // clear existing members
    await Member.insertMany([
      {
        name: "Aisha Khan",
        email: "aisha@example.com",
        phone: "9876543210",
        profession: "Doctor",
        district: "Chennai",
        company: "Apollo Hospitals",
        dob: new Date("1985-04-20"),
        age: 40,
        refNumber: "REF001"
      },
      {
        name: "Imran Patel",
        email: "imran@example.com",
        phone: "8123456789",
        profession: "Engineer",
        district: "Bangalore",
        company: "Infosys",
        dob: new Date("1990-08-15"),
        age: 35,
        refNumber: "REF002"
      }
    ]);

    console.log("✅ Seed data inserted");
  } catch (error) {
    console.error("❌ Seed error:", error);
  } finally {
    mongoose.disconnect();
  }
};

seed();
