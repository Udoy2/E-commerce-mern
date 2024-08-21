const createHttpError = require("http-errors");
const Product = require("../models/productModel");

const productExistOrNot = async (name) => {
  try {
    const productExists = await Product.exists({ name: name });
    
    if (productExists) {
      throw createHttpError(409, "product with this name already exists");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { productExistOrNot };
