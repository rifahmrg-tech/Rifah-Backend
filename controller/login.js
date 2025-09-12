//controller/login.js

const User = require("../model/member");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const Activity = require("../model/activity");
const Member = require("../model/RifahMembers");


//Register new user
const register = async(req,res)=>{
  const {memberId,username,password,role} = req.body;
  if (!username || !password) {
        return res.status(400).json({ message: "username and password is required" })
    }
  try{
    let user = await User.findOne({username});
    if(user){
      return res.status(400).json({error:"Username already exists"})
    }
    const hashPwd = await bcrypt.hash(password, 10)
    const newUser = await User.create({memberId,username,password:hashPwd,role});
    const member = await Member.findById(memberId);
   
     await Activity.create({
              type: 'USER',
              action: 'created',
              meta: {
                username, // username
                memberName: member.name, // member names
              },
              targetId: newUser._id,
            });
  
          res.status(201).json({message:"User added successfully",user:newUser});
          }catch(err){
              console.error("Error adding User:",err);
              res.status(500).json({message:"Server Error",error:err.message});
          }

}



//login
const login = async (req, res) => {
  const { username, password } = req.body;
  const  businessEmailAddress=username;

  try {
    const user = await User.findOne({ businessEmailAddress});
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordForLogin);
    if (!isMatch )
      return res.status(400).json({ message: "Invalid credentials or role" });

    const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 2 * 60 * 60 * 1000,
    }).json({ message: "Login successful",success: true,user: { id:user._id }} );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getAllUser = async(req,res)=>{
    const users = await User.find()
    return res.json(users);
}

 //logout
const logOut= (req, res) => {
  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
}).json({ message: "Logged out" });
}

//check
const check= async (req, res) => {
  res.json({ userId: req.user.userId });
}
module.exports ={login,logOut,check,register,getAllUser}