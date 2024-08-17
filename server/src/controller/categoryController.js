const { successResponse } = require("./responseController");
const slugify = require('slugify');
const Category = require("../models/categoryModel");
const { createCategory, getCateogries, getCateogryBySlug, updateCategoryBySlug } = require("../services/categoryService");

const handleCreateCategory =async (req,res,next) => {
    try {
        const {name} = req.body;
        //service: createCategory
        const newCategory = await createCategory(name);
        return successResponse(res,{
            statusCode:200,
            message:'Category created successfully',
            payload:newCategory
        })
    } catch (error) {
        next(error);
    }
}

const handleGetCategories =async (req,res,next) => {
    try {
        //service: createCategory
        const allCategories = await getCateogries();
        return successResponse(res,{
            statusCode:200,
            message:'Categories fetched successfully!',
            payload:allCategories
        })
    } catch (error) {
        next(error);
    }
}
const handleGetCategory =async (req,res,next) => {
    try {
        //service: createCategory
        const {slug} = req.params;
        
        const category = await getCateogryBySlug(slug);
        return successResponse(res,{
            statusCode:200,
            message:'Categories fetched successfully!',
            payload:category
        })
    } catch (error) {
        next(error);
    }
}
const handleUpdateCategory =async (req,res,next) => {
    try {
        //service: createCategory
        const {slug} = req.params;
        const {name} = req.body;
        
        const category = await updateCategoryBySlug(slug,name);
        return successResponse(res,{
            statusCode:200,
            message:'Categories updated successfully!',
            payload:category
        })
    } catch (error) {
        next(error);
    }
}
module.exports = {handleCreateCategory,handleGetCategories,handleGetCategory,handleUpdateCategory}