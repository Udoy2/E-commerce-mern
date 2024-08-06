const User = require("../models/userModel");
const createHttpError = require("http-errors");
const { successResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { findWithID } = require("../services/findWithID");
const { deleteImage } = require("../helper/deleteImage");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { jwtActivationKey } = require("../secret");

const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp(".*" + search + ".*", "i")
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ]
        }
        const options = { password: 0 }
        const users = await User
            .find(filter, options)
            .skip((page - 1) * limit)
            .limit(limit)

        const count = await User.find(filter).countDocuments();
        if (!users) throw createHttpError(404, "no users found");
        return successResponse(res,{
            statusCode: 200,
            message:"user were returned Successfully",
            payload: {
                users,
                pagination: {
                    totalPage: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
                }
            }
        })
    } catch (error) {
        next(error)
    }
}
const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const option = {password:0}
        const user = await findWithID( User, id,{options:option})
        return successResponse(res,{
            statusCode: 200,
            message:"user were returned Successfully",
            payload: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const option = {password:0}
        const user = await findWithID(User,id,{options:option})
        const userImagePath = user.image;
        deleteImage(userImagePath);
        await User.findByIdAndDelete({_id:id,isAdmin:false});
        return successResponse(res,{
            statusCode: 200,
            message:"user were deleted Successfully",

        })
    } catch (error) {
        next(error)
    }
}
const processRegister = async (req, res, next) => {
    try {
        const {name,email,password,phone,address} = req.body;
        const userExists = await User.exists({email:email});
        if(userExists) throw createHttpError(409,"User with this already exists, Please log in");
        
        // create jwt
        const token = createJSONWebToken({name,email,password,phone,address},jwtActivationKey,'10m')
        console.log(req.body);
        
        return successResponse(res,{
            statusCode: 200,
            message:"user was created Successfully",
            payload:{
                token,
            }
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { getUsers,getUser,deleteUser,processRegister }