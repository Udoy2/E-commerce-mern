const { successResponse } = require("./responseController")

const handleCreateProduct = async (req,res,next) => {
    return successResponse(res,{
        statusCode:200,
        message:'Product created successfully'
    })
}

module.exports = {handleCreateProduct}