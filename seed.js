// const mongoose = require('mongoose');
// require('dotenv').config(); // Load your .env file
// const connectDB = require('./config/connectionDB');

// // 1. Define the Schema (Must match your actual Member/Provider model)
// // If you already have a model file, you can import it instead:
// // const Member = require('./models/Member'); 
// const memberSchema = new mongoose.Schema({
//   businessName: String,
//   ownerName: String,
//   category: String, // e.g., "IT Services", "Construction"
//   area: String,     // e.g., "Thillai Nagar", "KK Nagar"
//   city: { type: String, default: 'Trichy' },
//   mobile: String,
//   description: String,
//   serviceType: { type: String, default: 'Provider' } // To distinguish from seekers
// });

// const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);

// // 2. Sample Data (Rifah & Trichy Context)
// const sampleData = [
//   {
//     businessName: "Rifah Business Consultants",
//     ownerName: "Abdul Rahman",
//     category: "Business Consulting",
//     area: "Cantonment",
//     mobile: "919876543210",
//     description: "Expert business consulting for startups and scale-ups. We help you with strategic planning and taxation.",
//   },
//   {
//     businessName: "Trichy Tech Solutions",
//     ownerName: "Mohamed Riaz",
//     category: "IT Services",
//     area: "Thillai Nagar",
//     mobile: "919876543211",
//     description: "Web development, mobile apps, and digital marketing services for small businesses.",
//   },
//   {
//     businessName: "Green Field Construction",
//     ownerName: "Syed Ibrahim",
//     category: "Construction",
//     area: "K.K. Nagar",
//     mobile: "919876543212",
//     description: "Residential and commercial building contractors. Quality construction at affordable prices.",
//   },
//   {
//     businessName: "Al-Mina Exports",
//     ownerName: "Fatima Bi",
//     category: "Export & Import",
//     area: "Woraiyur",
//     mobile: "919876543213",
//     description: "Exporting high-quality textiles and spices to international markets.",
//   },
//   {
//     businessName: "Rifah Event Planners",
//     ownerName: "Zainab Banu",
//     category: "Event Management",
//     area: "Srirangam",
//     mobile: "919876543214",
//     description: "We organize corporate events, weddings, and business networking meets.",
//   },
//   {
//     businessName: "City Care Pharmacy",
//     ownerName: "Dr. Ahmed",
//     category: "Healthcare",
//     area: "Tennur",
//     mobile: "919876543215",
//     description: "24/7 pharmacy and medical supplies delivery in Trichy city.",
//   },
//   {
//     businessName: "Global Logistics",
//     ownerName: "Karthik Raja",
//     category: "Logistics",
//     area: "Airport Area",
//     mobile: "919876543216",
//     description: "Reliable transport and logistics services for industrial goods.",
//   },
//   {
//     businessName: "Smart Edu Academy",
//     ownerName: "Sarah Johnson",
//     category: "Education",
//     area: "Crawford",
//     mobile: "919876543217",
//     description: "Coaching center for NEET, JEE, and professional skill development.",
//   },
//   {
//     businessName: "Fresh Foods Organic",
//     ownerName: "Hameed Khan",
//     category: "Food & Beverage",
//     area: "Gandhi Market",
//     mobile: "919876543218",
//     description: "Wholesale supplier of organic vegetables and fruits.",
//   },
//   {
//     businessName: "Rifah Legal Advisors",
//     ownerName: "Adv. Meera",
//     category: "Legal Services",
//     area: "Court Area",
//     mobile: "919876543219",
//     description: "Corporate legal services, documentation, and property registration assistance.",
//   }
// ];

// // 3. Insert Function
// const seedDB = async () => {
//   try {
//     await connectDB();
//     console.log("🔌 Connected to MongoDB...");

//     // Optional: Clear existing data to avoid duplicates
//     // await Member.deleteMany({});
//     // console.log("🗑️  Cleared existing members...");

//     await Member.insertMany(sampleData);
//     console.log("✅ 10 Sample Members Added Successfully!");

//     process.exit();
//   } catch (error) {
//     console.error("❌ Error seeding database:", error);
//     process.exit(1);
//   }
// };

// seedDB();

//-----------------------11/02------------------12.49--------------------

const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/connectionDB');

// 1. Define Schemas (Simple versions to match your collections)
const memberSchema = new mongoose.Schema({
  businessName: String,
  ownerName: String,
  category: String,
  area: String,
  city: { type: String, default: 'Trichy' },
  mobile: String,
  description: String,
  serviceType: { type: String, default: 'Provider' }
});

const requestSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  category: String,
  area: String,
  city: { type: String, default: 'Trichy' },
  description: String,
  status: { type: String, default: 'Open' }, // Open, In Progress, Closed
  createdAt: { type: Date, default: Date.now }
});

// 2. Connect Models
const Member = mongoose.models.Member || mongoose.model('Member', memberSchema);
// Make sure 'ServiceRequest' matches what you called it in your controller/model file
const ServiceRequest = mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', requestSchema);

// 3. Sample Data
const sampleMembers = [
  {
    businessName: "Trichy Tech Solutions",
    ownerName: "Mohamed Riaz",
    category: "IT Services",
    area: "Thillai Nagar",
    mobile: "919876543211",
    description: "Web development and digital marketing services.",
  },
  {
    businessName: "Green Field Construction",
    ownerName: "Syed Ibrahim",
    category: "Construction",
    area: "K.K. Nagar",
    mobile: "919876543212",
    description: "Residential building contractors.",
  }
  // ... (You can keep the other members from before)
];

const sampleRequests = [
  {
    name: "Ahmed Khan",
    mobile: "9876543210",
    category: "Plumbing",
    area: "Cantonment",
    description: "Need urgent repair for a leaking pipe in the kitchen.",
    status: "Open"
  },
  {
    name: "Fatima Bee",
    mobile: "9876543211",
    category: "Electrical",
    area: "Woraiyur",
    description: "Looking for an electrician to install new ceiling fans.",
    status: "Open"
  },
  {
    name: "John Peter",
    mobile: "9876543212",
    category: "IT Services",
    area: "Srirangam",
    description: "Need a laptop formatted and Windows 11 installed.",
    status: "In Progress"
  },
  {
    name: "Senthil Kumar",
    mobile: "9876543213",
    category: "Construction",
    area: "Airport",
    description: "Need a quote for renovating a small shop.",
    status: "Open"
  }
];

// 4. Insert Function
const seedDB = async () => {
  try {
    await connectDB();
    console.log("🔌 Connected to MongoDB...");

    // Optional: Clear existing data
    // await Member.deleteMany({});
    // await ServiceRequest.deleteMany({});

    // Check if data exists before adding (to avoid duplicates if you run it twice)
    const memberCount = await Member.countDocuments();
    const requestCount = await ServiceRequest.countDocuments();

    if (memberCount === 0) {
      await Member.insertMany(sampleMembers);
      console.log("✅ Sample Members Added!");
    } else {
      console.log("ℹ️ Members already exist. Skipping...");
    }

    if (requestCount === 0) {
      await ServiceRequest.insertMany(sampleRequests);
      console.log("✅ Sample Service Requests Added!");
    } else {
      console.log("ℹ️ Requests already exist. Skipping...");
    }

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();