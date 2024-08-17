const slugify = require('slugify');
const Category = require("../models/categoryModel");

const createCategory =async (name) => {
    try {
        const {name} = req.body;
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

module.exports = {createCategory}