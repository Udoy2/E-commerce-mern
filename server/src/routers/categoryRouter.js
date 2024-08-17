const express = require("express");
const { runValidation } = require("../validators");
const { validateCategory } = require("../validators/category");
const { isLoggedIn, isLoggedOUT, isAdmin } = require("../middlewares/auth");
const { handleCreateCategory, handleGetCategories, handleGetCategory } = require("../controller/categoryController");
const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleCreateCategory
);
categoryRouter.get(
    "/",
    handleGetCategories
);

categoryRouter.get(
    "/:slug",
    handleGetCategory
  );
module.exports = { categoryRouter };
