const express = require("express");
const { upload } = require("../middlewares/uploadFile");
const { validateUserRegistration } = require("../validators/auth");
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
  upload.single("image"),
  validateProduct,
  runValidation,
  handleCreateProduct
);
productRouter.get("/", handleGetProduct);
productRouter.get("/:slug", handleGetSingleProduct);
productRouter.delete("/:slug", deleteProduct);
productRouter.put(
  "/:slug",
  upload.single("image"),
  updateProduct
);

module.exports = { productRouter };
