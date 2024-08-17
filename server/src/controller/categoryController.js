const { successResponse } = require("./responseController");
const slugify = require('slugify');
const Category = require("../models/categoryModel");

const handleCreateCategory =async (req,res,next) => {
    try {
        const {name} = req.body;
        const slugName = slugify(name);
        const newCategory = await Category.create({
            name: name,
            slug: slugName
        });
        return successResponse(res,{
            statusCode:200,
            message:'Category created successfully',
            payload:newCategory
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {handleCreateCategory}