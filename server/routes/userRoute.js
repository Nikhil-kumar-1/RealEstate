const express = require("express");
const { createUser } = require("../controllers/userCntrl");

const router = express.Router();

router.post("/register", createUser);

module.exports = { userRoute: router };
