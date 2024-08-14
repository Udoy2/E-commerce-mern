const { successResponse } = require("./responseController");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

const User = require("../models/userModel");
const createHttpError = require("http-errors");
const { jwtAccessKey, jwtActivationKey, clientUrl } = require("../secret");
const { emailWithNodeMailer } = require("../helper/email");

const handleLogin = async (req, res, next) => {
  try {
    // email , password
    const { email, password } = req.body;

    // if the user exists
    const user = await User.findOne({ email });

    if (!user)
      throw createHttpError(
        404,
        "User does not exist with this email, Please register first"
      );
    // compare the password
    const isPasswordMatch = await bycrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw createHttpError(401, "Email/password doesn't mathch");
    // isBanned
    if (user.isBanned)
      throw createHttpError(403, "You are banned! Please contact the admins!");
    // token generate,cookie

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    const accessToken = createJSONWebToken(
      { user: userWithoutPassword },
      jwtAccessKey,
      "1m"
    );
    const refreshToken = createJSONWebToken(
      { user: userWithoutPassword },
      jwtAccessKey,
      "7d"
    );
    res.cookie("accessToken", accessToken, {
      maxAge: 1 * 60 * 1000, //15 min
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7*24*60*60*1000, //7 days
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return successResponse(res, {
      statusCode: 200,
      message: "Login Successfull",
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    return successResponse(res, {
      statusCode: 200,
      message: "Logout Successfull",
    });
  } catch (error) {
    next(error);
  }
};

const handleForgetPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) throw createHttpError(404, "No user found on this email!");
    const token = createJSONWebToken({ email: email }, jwtActivationKey, "15m");
    // email
    const emailData = {
      email,
      subject: "Password reset email!",
      html: `
                <h2> Hello ${email} <h2>
                <p> Please Click here to <a href="${clientUrl}/api/auth/reset-password/${token} target='_blank'"> activate </a> </p>
              `,
    };
    try {
      emailWithNodeMailer(emailData);
    } catch (error) {
      next(createHttpError(500, "Failed to send verification email"));
    }
    return successResponse(res, {
      statusCode: 200,
      message: "Pasword reset link sent to your email Successfully",
      payload: { email, token },
    });
  } catch (error) {
    next(error);
  }
};

const handleResetPassword = async (req, res, next) => {
    try {
      const {token,password} = req.body;
      const decoded = jwt.verify(token,jwtActivationKey);
      if(!decoded) throw createHttpError(401,"Your token is not verified or expired! try again!");
      const updateOptions = {new:true,validation:true,context: "query" };
      const update = {password:password};
      const user = await User.findOneAndUpdate({email:decoded.email},update,updateOptions).select("-password");
      
      return successResponse(res, {
        statusCode: 200,
        message: "Your password reset was successfull!",
        payload: { user },
      });
    } catch (error) {
      next(error);
    }
  };
  
  
module.exports = { handleLogin, handleLogout, handleForgetPassword,handleResetPassword };
