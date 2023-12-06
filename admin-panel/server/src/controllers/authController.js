const User = require("../models/Usermodel");
const bcrypt= require("bcrypt");
const moment=require("moment");
const jwt = require("jsonwebtoken");

/**login api */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      throw new Error("User not Found");
    }
    /**compare password   */
    // const successPassword = await bcrypt.compare(password, findUser.password);
    // if (!successPassword) throw Error("Inccorect Password");
 if(password === findUser.password){
    /**create Token */
        let payload = {
      email,
      expiresIn: moment().add(10, "minutes").unix(),
    };

    /**create accesstoken */
    let accessToken;
    if (findUser) {
      accessToken = await jwt.sign(payload, process.env.JWT_SECRECT_KEY);
    }

    /**user find token and update token */
    // let data;
    // if (accessToken) {
    //   data = await User.findByIdAndUpdate(
    //     // { id },
    //     {
    //       $set: { accessToken: token },
    //     },
    //     { new: true }
    //   );
    // //   findUserAndUpdate(findUser._id, accessToken);
    // }

    // /**generate Refresh token */
    // const generateRefreshToken = (payload) => {
    //   return jwt.sign(payload, refreshSecret);
    // };

    // const refreshToken = generateRefreshToken(payload);
 
    res.status(200).json({
      success: true,
      message: "User Login successfully!",
      accessToken: accessToken,
    //   refreshToken: refreshToken,
    });
}
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports ={login};

