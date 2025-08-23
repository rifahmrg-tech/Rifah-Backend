const mongoose = require('mongoose');

const STRING ="mongodb://localhost:27017/rifahdb";
const STRING2 ="mongodb+srv://mohamedyoosuf2001:BvWSEKLCm14nihZ4@clusterrifah.o2i6ml8.mongodb.net/RifahMembers";
const connectDB = async()=>{
    await mongoose.connect(STRING2)
    .then(()=>console.log("DB connected"))
    .catch((err)=>console.error("Connection error:",err))
}

module.exports=connectDB