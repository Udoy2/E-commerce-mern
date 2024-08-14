const { body } = require('express-validator');
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
    .withMessage("Phone is required"),


    body("image")
    .custom((value,{req})=>{
        if(!req.file || !req.file.buffer){
            throw new Error('User image is required');
        }
        return true;
    })
    .withMessage("Phone is required"),

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
//sign in validation

module.exports = {validateUserRegistration,validateUserLogin,forgetPasswordValidator,resetPasswordValidator};
