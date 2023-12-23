const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const ejs = require("ejs");
const { sendMail, generateOTP } = require("./emailService");
dotenv.config;

/* ---------------------------- Register admin Data ---------------------------- */

const register = async (req, res) => {
  try {
    const reqbody = req.body;

    /** find email Id*/
    const adminExist = await Admin.findOne({ email: reqbody.email });

    if (adminExist) {
      throw new Error(`Email already use ${reqbody.email} `);
    }

    /**create user by create service */
    const admin = await Admin.create(reqbody);

    /**create accesstoken */
    const payload = {
      name: reqbody.name,
      email: reqbody.email,
      expiresIn: moment().add(5, "minutes").unix(),
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRECT_KEY);

    /**   generate Refresh Token */
    const generateRefreshToken = (payload) => {
      return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY);
    };

    const refreshToken = generateRefreshToken(payload);

    const tokens = {
      admin: admin,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    res.status(201).json({
      success: true,
      message: "Admin data create successfully !",
      info: tokens,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* -------------------------------- login admin data ------------------------------- */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email });

    if (!admin)
      return res.status(401).json({
        Success: false,
        message: "Invalid Username!",
      });

    const validatePassword = await bcrypt.compare(password, admin.password);

    if (!validatePassword) {
      return res.status(401).json({
        Success: false,
        message: "Invalid Password!",
      });
    }

    const payload = {
      email,
      expiresIn: moment().add(10, "minutes").unix(),
    };

    let accessToken;
    if (password && admin.password) {
      accessToken = jwt.sign(payload, process.env.JWT_SECRECT_KEY);
      admin.accessToken = accessToken;
    }
    const generateRefreshToken = (payload) => {
      return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY);
    };

    const refreshToken = generateRefreshToken({ email: email });
    admin.refreshToken = refreshToken;
    const output = await admin.save();

    res.status(200).json({
      success: true,
      admin: admin,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

/* ----------------------------- Get admin data ----------------------------- */
const getadmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin data not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* ----------------------------- Forgot password mail send ----------------------------- */
const forgotPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email Id" });

    const otp = generateOTP(); //generate otp code emailService through generate
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

    admin.otp = {
      value: otp,
      expiration: expirationTime,
    };

    // Save the OTP in the user document
    admin.otp = otp; //otp is admin model key name
    await admin.save();

    // Render the EJS template
    const emailTemplate = await ejs.renderFile("./src/views/forgotemail.ejs", {
      otp,
    });

    // send mail service is use by email service
    const mailSent = sendMail(email, emailTemplate, "Password Reset OTP");

    if (!mailSent) {
      // If email sending fails, handle the error
      res.status(404).json({
        success: false,
        message: "Failed to send email with OTP",
      });
    }
    res.status(200).json({
      success: true,
      message: `Check your email for the OTP: ${otp}`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ----------------------------- Reset Password ----------------------------- */

const resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  try {
    // Find the user by email and verify OTP
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found." });
    }
    // Check if OTP is valid and not expired
    if (admin.otp != otp || admin.otpExpiration < Date.now()) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    // Update the user's password and clear the OTP and reset OTP expiration
    admin.password = newPassword;
    admin.otp = null;
    admin.otpExpiration = null;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
  register,
  getadmin,
  forgotPasswordEmail,
  resetPassword,
};
