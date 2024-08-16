const { body } = require("express-validator");
//registration validation
const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category Name is required")
    .isLength({ min: 3})
    .withMessage("Category Name sould be atleast 3 char long"),

  
];

//sign in validation

module.exports = {
  validateCategory,

};
