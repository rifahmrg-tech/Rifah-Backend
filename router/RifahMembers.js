const express = require("express");
const router = express.Router();
const {getMember} = require("../controller/RifahMembers");

router.get("/",getMember);

module.exports = router;