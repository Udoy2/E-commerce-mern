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
const getProducts = async (page,limit) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    if (!products) throw createHttpError(404, "No product found");
    const count = await Product.countDocuments();
    const payload = {
      products,
      pagination: {
        totalPage: Math.ceil(count / limit),
        totalNumberOfProducts: count,
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    };
    return payload;
  } catch (error) {
    throw error;
  }
};
module.exports = { createproduct,getProducts };
