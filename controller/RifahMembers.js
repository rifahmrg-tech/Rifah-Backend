const Member = require("../model/RifahMembers");

const getMember = async(req,res)=>{
    try{
         const member = await Member.find();
    res.status(200).json(member);
    }catch(err){
        res.json(err);
    } 
}

module.exports = {getMember}