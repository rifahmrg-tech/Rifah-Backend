const express = require("express");
const router = express.Router();
const { addMember, getMembers, getMemberById } = require("../controller/member");


router.post("/",addMember);

router.get("/", getMembers);

router.get("/:id", getMemberById);

module.exports = router;