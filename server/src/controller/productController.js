const createHttpError = require("http-errors");
const { successResponse } = require("./responseController");
const {
  createproduct,
  getProducts,
  getSingleProduct,
  deleteProductService,
  updateProductService,
} = require("../services/productService");

const handleCreateProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.body;
    const image = req.file;
    if (!image) {
      throw createHttpError(400, "Image file is required");
    }
    if (image.size > 1024 * 1024 * 2) {
      throw createHttpError(400, "File is too large, it must be less than 2mb");
    }
    const imageBufferString = image.buffer.toString("base64");
    const product = await createproduct(
      name,
      description,
      price,
      quantity,
      shipping,
      category,
      imageBufferString
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Product created successfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};
const handleGetProduct = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const payload = await getProducts(search,page, limit);
    return successResponse(res, {
      statusCode: 200,
      message: "product fetched successfully",
      payload: payload,
    });
  } catch (error) {
    next(error);
  }
};
const handleGetSingleProduct = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const product = await getSingleProduct(slug);
    return successResponse(res, {
      statusCode: 200,
      message: "product fetched successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.body;
    const image = req.file;
    const slug = req.params.slug;    
    const product = await updateProductService(
      slug,
      name,
      description,
      price,
      quantity,
      shipping,
      category,
      image
    );
    return successResponse(res, {
      statusCode: 200,
      message: "Product created successfully",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    await deleteProductService(slug);
    return successResponse(res, {
      statusCode: 200,
      message: "product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  handleCreateProduct,
  handleGetProduct,
  handleGetSingleProduct,
  deleteProduct,
  updateProduct
};
