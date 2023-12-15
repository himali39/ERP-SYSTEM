const express = require("express");
const { login, register, getadmin } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", register);

router.post("/login", login);

router.get("/getadmin/:id", getadmin);

module.exports = router;
