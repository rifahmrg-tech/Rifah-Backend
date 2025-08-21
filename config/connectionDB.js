const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://mohamedyoosuf2001:BvWSEKLCm14nihZ4@clusterrifah.o2i6ml8.mongodb.net/RifahMembers")
    .then(()=>console.log("DB connected"))
    .catch((err)=>console.error("Connection error:",err))
}

module.exports=connectDB