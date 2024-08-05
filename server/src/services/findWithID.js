const createHttpError = require("http-errors");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const findWithID= async (id,{options}) => {
    try {
        const item = await User.findById(id,options);
        if (!item) throw createHttpError(404, "item does not exit with this id");
        
    } catch (error) {
        if(error  instanceof mongoose.Error){
            throw createHttpError(400,"Invalid item Id")
        }
        throw error;
    }
}

module.exports = {findWithID}