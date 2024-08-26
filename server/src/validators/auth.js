const { body } = require('express-validator');
const path = require('path');
//registration validation
const validateUserRegistration = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({min:3,max:31})
    .withMessage("Name sould be atleast 3-31 char long"),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:6})
    .withMessage("Password sould be atleast 6 character long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .withMessage("Password sould contain Minimum eight characters, at least one letter, one number and one special character"),
    
    body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({min:6})
    .withMessage("Address sould be atleast 6 character long"),

    body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
]

const validateUserLogin = [


    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:6})
    .withMessage("Password sould be atleast 6 character long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .withMessage("Password sould contain Minimum eight characters, at least one letter, one number and one special character"),
 

]
const forgetPasswordValidator = [


    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),

 

]
const resetPasswordValidator = [


    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:6})
    .withMessage("Password sould be atleast 6 character long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .withMessage("Password sould contain Minimum eight characters, at least one letter, one number and one special character"),
 

 

]

const validateUserAvatar = [
    body('image').custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Image file is required.');
        }
        // Check file type (e.g., only allow jpg and png)
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(req.file.originalname).toLowerCase());
        const mimeType = fileTypes.test(req.file.mimetype);
    
        if (!extname || !mimeType) {
          throw new Error('Only images of type jpg, jpeg, or png are allowed.');
        }
    
        // Check file size (e.g., max 5MB)
        if (req.file.size > 5 * 1024 * 1024) {
          throw new Error('File size should not exceed 5MB.');
        }
    
        return true;
      }),
]
//sign in validation

module.exports = {validateUserRegistration,validateUserLogin,forgetPasswordValidator,resetPasswordValidator,validateUserAvatar};
