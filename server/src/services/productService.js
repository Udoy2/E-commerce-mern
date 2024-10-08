const createHttpError = require("http-errors");
const Product = require("../models/productModel");
const slugify = require("slugify");
const { deleteImageFromCloudinary, uploadImageToCloudinary } = require("../helper/cloudinaryHelper");

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
const getProducts = async (search, page, limit) => {
  try {
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      $or: [{ name: { $regex: searchRegExp } }],
    };
    const products = await Product.find(filter)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    if (!products) throw createHttpError(404, "No product found");
    const count = await Product.find(filter).countDocuments();
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
const getSingleProduct = async (slug) => {
  try {
    const product = await Product.findOne({ slug });
    if (!product) throw createHttpError(404, "No product found");
    return product;
  } catch (error) {
    throw error;
  }
};
const updateProductService = async (
  slug,
  name,
  description,
  price,
  quantity,
  shipping,
  category,
  image
) => {
  try {
    const updateOptions = { new: true, runValidators: true, context: "query" };
    const updates = {};
    const oldProduct = await Product.findOne(
      { slug },
    );
    if(!oldProduct) throw Error('No product found with this slug');
    // Populate the updates object only if the corresponding field is provided
    if (name) {
      updates.name = name;
      updates.slug = slugify(name);
    }
    if (description) updates.description = description;
    if (price) updates.price = price;
    if (quantity) updates.quantity = quantity;
    if (shipping) updates.shipping = shipping;
    if (category) updates.category = category;
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createHttpError(
          400,
          "File is too large, it must be less than 2mb"
        );
      }
      const secure_url=await uploadImageToCloudinary(image.path,'ecommerceMern/products');
      updates.image = secure_url;
      if(oldProduct.image) await deleteImageFromCloudinary(oldProduct.image,'ecommerceMern/products')
    }

    // Find and update the product based on the slug
    const product = await Product.findOneAndUpdate(
      { slug },
      updates,
      updateOptions
    );
    if (!product) throw createHttpError(404, "Product not found");
    return product;
  } catch (error) {
    throw error;
  }
};

const deleteProductService = async (slug) => {
  try {
    const product = await Product.findOne({ slug });
    if (!product) throw createHttpError(404, "No product found");
    if (product.image) {
      await deleteImageFromCloudinary(product.image, "ecommerceMern/products");
    }
    await Product.deleteOne({ slug });
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createproduct,
  getProducts,
  getSingleProduct,
  deleteProductService,
  updateProductService,
};
// comment
