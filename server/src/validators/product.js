const { body } = require("express-validator");
//registration validation
const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product Name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Category Name sould be atleast 3-150 char long"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product Description is required")
    .isLength({ min: 3 })
    .withMessage("Product Description sould be atleast 3 char long"),

  body("price")
    .trim()
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("quantity must be a positive integer"),
];

//sign in validation

module.exports = {
  validateProduct,
};
