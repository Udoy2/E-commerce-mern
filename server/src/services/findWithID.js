const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");

const findWithID= async (Model,id,{options}) => {
    try {
        const item = await Model.findById(id,options);
        if (!item) throw createHttpError(404, `${Model.modelName} does not exit with this id`);
        return item;
    } catch (error) {
        if(error  instanceof mongoose.Error){
            throw createHttpError(400,`Invalid ${Model.modelName} Id`)
        }
        throw error;
    }
}

module.exports = {findWithID}