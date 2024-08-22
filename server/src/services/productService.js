const createHttpError = require("http-errors");
const Product = require("../models/productModel");

const createproduct = async (
  name,
  description,
  price,
  quantity,
  shipping,
  category,
  imageBufferString
) => {
  try {
    const productExists = await Product.exists({ name: name });

    if (productExists) {
      throw createHttpError(409, "product with this name already exists");
    }
    // create product
    const product = await Product.create({
      name: name,
      slug: slugify(name),
      description: description,
      price: price,
      quantity: quantity,
      shipping: shipping,
      category: category,
      image: imageBufferString,
    });
    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = { createproduct };
