const slugify = require("slugify");
const Category = require("../models/categoryModel");

const createCategory = async (name) => {
  try {
    const slugName = slugify(name);
    const newCategory = await Category.create({
      name: name,
      slug: slugName,
    });
    return newCategory;
  } catch (error) {
    throw error;
  }
};
const getCateogries = async () => {
  try {
    return await Category.find({}).select("name slug").lean();
  } catch (error) {
    throw error;
  }
};
const getCateogryBySlug = async (slug) => {
  try {
    return await Category.find({ slug: slug }).select("name slug").lean();
  } catch (error) {
    throw error;
  }
};
const updateCategoryBySlug = async (slug, name) => {
  try {
    const slugName = slugify(name);
    const options = {new:true,query:"context"};
    const updates = {
      name: name,
      slug: slugName,
    };
    const newCategory = await Category.findOneAndUpdate({slug:slug},updates,options);
    return newCategory;
  } catch (error) {
    throw error;
  }
};
const deleteCategoryBySlug = async (slug) => {
    try {
      await Category.findOneAndDelete({slug:slug});
    } catch (error) {
      throw error;
    }
  };
module.exports = {
  createCategory,
  getCateogries,
  getCateogryBySlug,
  updateCategoryBySlug,
  deleteCategoryBySlug
};
