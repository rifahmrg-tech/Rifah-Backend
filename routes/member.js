const express = require("express");
const router = express.Router();
const {addMember} = require("../controller/member");

router.post("/",addMember);

module.exports = router;