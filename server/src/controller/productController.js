const createHttpError = require("http-errors");
const { successResponse } = require("./responseController");
const { productExistOrNot } = require("../services/productService");
const Product = require("../models/productModel");
const { default: slugify } = require("slugify");
const { logger } = require("./loggerController");

const handleCreateProduct = async (req,res,next) => {
    try {
        const {name,description,price,quantity,shipping,category} = req.body;
        const image = req.file;
        if(!image){
            throw createHttpError(400,"Image file is required");
        }
        if(image.size > 1024*1024*2){
            throw createHttpError(400,"File is too large, it must be less than 2mb");
        }
        const imageBufferString = image.buffer.toString('base64');
        await productExistOrNot(name);
        // create product
        const product = await Product.create({
            name:name,
            slug:slugify(name),
            description:description,
            price:price,
            quantity:quantity,
            shipping:shipping,
            category:category,
            image:imageBufferString
        })
        
        return successResponse(res,{
            statusCode:200,
            message:'Product created successfully',
            payload:{product}
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {handleCreateProduct}