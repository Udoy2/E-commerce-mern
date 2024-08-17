const slugify = require('slugify');
const Category = require("../models/categoryModel");

const createCategory =async (name) => {
    try {
        const slugName = slugify(name);
        const newCategory = await Category.create({
            name: name,
            slug: slugName
        });
        return newCategory;
    } catch (error) {
        throw error;
    }
}
const getCateogries =async () => {
    try {
        return await Category.find({}).select('name slug').lean();
    } catch (error) {
        throw error;
    }
}
const getCateogryBySlug =async (slug) => {
    try {
        return await Category.find({slug:slug}).select('name slug').lean();
    } catch (error) {
        throw error;
    }
}
module.exports = {createCategory,getCateogries,getCateogryBySlug}