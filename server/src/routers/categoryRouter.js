const express = require("express");
const { runValidation } = require("../validators");
const { validateCategory } = require("../validators/category");
const { isLoggedIn, isLoggedOUT, isAdmin } = require("../middlewares/auth");
const {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} = require("../controller/categoryController");
const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleCreateCategory
);
categoryRouter.get("/", handleGetCategories);

categoryRouter.get("/:slug", handleGetCategory);

categoryRouter.put(
  "/:slug",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleUpdateCategory
);
categoryRouter.delete(
    "/:slug",
    isLoggedIn,
    isAdmin,
    handleDeleteCategory
);
module.exports = { categoryRouter };
