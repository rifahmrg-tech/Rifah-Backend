const Member = require("../model/RifahMembers");

const getMember = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMember };