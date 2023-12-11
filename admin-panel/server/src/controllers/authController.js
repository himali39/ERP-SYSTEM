const User = require("../models/Usermodel");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");

/**login api */
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const findUser = await User.findOne({ email: email });
//     console.log(" findUser:", findUser);

//     if (!findUser) {
//       // If the user is not found, return an error
//       throw new Error("User not found");
//     }

//     // const passwordsMatch = await comparePasswords(password, findUser.password);

//     if (password == findUser.password) {
//       console.log("findUser.password:", findUser.password);
//       console.log("password:", password);
//       // Create Token

//       const payload = {
//         email,
//         expiresIn: moment().add(10, "minutes").unix(),
//       };

//       // Create access token
//       const accessToken = await jwt.sign(payload, process.env.JWT_SECRECT_KEY);

//       res.status(200).json({
//         success: true,
//         message: "User login successful!",
//         accessToken: accessToken,
//       });
//     } else {
//       // If passwords don't match, return authentication failed
//       res.json({
//         success: false,
//         status: 401,
//         message: "Authentication failed",
//       });
//     }
//   } catch (err) {
//     // Handle other errors (e.g., database errors, unexpected errors)
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

//Admin Login
const login = async (req, res, next) => {
  try {
    const admin = await User.findOne({ email: req.body.email });
    if (!admin)
      return res.status(401).json({
        isSuccess: false,
        status: 401,
        message: "Invalid Username!",
      });

    // const validatePassword = await bcrypt.compare(
    //   req.body.password,
    //   admin.password
    // );
    console.log(admin.password);
    if (admin.password != req.body.password) {
      return res.status(401).json({
        isSuccess: false,
        status: 401,
        message: "Invalid Password!",
      });
    }
    // const token = admin.generateAuthToken({ email: req.body.email });
    // admin.remember_token = token;

    // const refresh_token = admin.generateRefreshToken({ email: req.body.email });

    // const output = await admin.save();
    const tokens = {
      token: "sdasfdsf",
      refresh_token: "sdfsdf",
      admin: admin,
    };
    res.json({ isSuccess: true, status: 200, info: tokens });
  } catch (err) {
    next(err);
  }
};

// Assuming you have a function to compare passwords securely
// async function comparePasswords(plainPassword, hashedPassword) {
//   // Implement a secure method to compare passwords (e.g., using bcrypt)
//   // For simplicity, I'm assuming a synchronous comparison here
//   return plainPassword === hashedPassword;
// }

module.exports = { login };
