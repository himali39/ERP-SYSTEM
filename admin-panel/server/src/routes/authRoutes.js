const express = require("express");
const {
  login,
  register,
  getadmin,
  forgotPasswordEmail,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

/* -----------------------Admin Register ----------------------- */
router.post("/signup", register);

/* ----------------------- Admin Login  ----------------------- */
router.post("/login", login);

/* ----------------------- Get admin list ----------------------- */
router.get("/getadmin/:id", getadmin);

/* ----------------------- forgot password email send ----------------------- */
router.post("/forgot-email", forgotPasswordEmail);

/* ----------------------- reset password email send ----------------------- */
router.post("/reset-password", resetPassword);

module.exports = router;
