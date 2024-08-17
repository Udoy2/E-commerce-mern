const { successResponse } = require("./responseController");

const handleCreateCategory = (req,res,next) => {
    try {
        return successResponse(res,{
            statusCode:200,
            message:'Category created successfully'
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {handleCreateCategory}