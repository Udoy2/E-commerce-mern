const createHttpError = require("http-errors");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const findUserById= async (id) => {
    try {
        const options = {password:0};
        const user = await User.findById(id,options);
        if (!user) throw createHttpError(404, "user does not exit with this id");
        
    } catch (error) {
        if(error  instanceof mongoose.Error){
            throw createHttpError(400,"Invalid User Id")
        }
        throw error;
    }
}

module.exports = {findUserById}