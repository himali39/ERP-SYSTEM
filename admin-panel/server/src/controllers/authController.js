const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
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

/**Get admin data */
const getadmin = async (req, res) => {
  try {
    const  id  = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin data not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = { login, register,getadmin };
