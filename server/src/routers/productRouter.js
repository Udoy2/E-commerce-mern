const express = require("express");
const { uploadProduct } = require("../middlewares/uploadFile");
const { runValidation } = require("../validators");
const { isLoggedIn, isLoggedOUT, isAdmin } = require("../middlewares/auth");
const {
  handleCreateProduct,
  handleGetProduct,
  handleGetSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");
const { validateProduct } = require("../validators/product");

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedIn,
  uploadProduct.single("image"),
  validateProduct,
  runValidation,
  handleCreateProduct
);
productRouter.get("/", handleGetProduct);
productRouter.get("/:slug", handleGetSingleProduct);
productRouter.delete("/:slug", isLoggedIn, deleteProduct);
productRouter.put("/:slug", isLoggedIn, uploadProduct.single("image"), updateProduct);

module.exports = { productRouter };
