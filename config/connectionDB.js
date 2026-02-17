const mongoose = require('mongoose');

const STRING ="mongodb://localhost:27017/rifahdb";
const STRING2 ="mongodb://rifahmrg_db_user:rifah2026@cluster0-shard-00-00.qg8svfy.mongodb.net:27017,cluster0-shard-00-01.qg8svfy.mongodb.net:27017,cluster0-shard-00-02.qg8svfy.mongodb.net:27017/RifahMembers?ssl=true&replicaSet=atlas-cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ DB connected successfully");
    } catch (err) {
        console.error("❌ Connection error:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;