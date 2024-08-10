const { successResponse } = require("./responseController")
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const jwt = require("jsonwebtoken");
const bycrypt = require('bcryptjs');

const User = require("../models/userModel");
const createHttpError = require("http-errors");

const handleLogin = async (req,res,next) => {
    try {
        // email , password
        const {email,password} = req.body;
        
        // if the user exists
        console.log(req.body);
        const user = await User.findOne({email})
        
        if(!user) throw createHttpError(404,"User does not exist with this email, Please register first");
        // compare the password
        const isPasswordMatch = await bycrypt.compare(password,user.password);
        if(!isPasswordMatch) throw createHttpError(401,'Email/password doesn\'t mathch');
        // isBanned
        if(user.isBanned) throw createHttpError(403,'You are banned! Please contact the admins!');
        // token generate,cookie
        
        return successResponse(res, {
            statusCode: 200,
            message: "Login Successfull",
          });
    } catch (error) {
        next(error)
    }


}

module.exports = {handleLogin}