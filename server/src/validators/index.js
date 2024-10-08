const { validationResult } = require("express-validator");
const { errorResponse } = require("../controller/responseController");

const runValidation = async (req, res, next) => {
  
  try {
    console.log(req.image);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, {
        statusCode: 422,
        message: errors.array()[0].msg,
      });
    }
    return next();
  } catch (errors) {
    return next(errors);
  }
};

module.exports = { runValidation };
