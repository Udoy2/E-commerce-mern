const createHttpError = require("http-errors");
const { successResponse } = require("./responseController");
const { createproduct } = require("../services/productService");

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

module.exports = { handleCreateProduct };
