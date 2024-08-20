const express = require('express');
const { upload } = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const { runValidation } = require('../validators');
const { isLoggedIn, isLoggedOUT, isAdmin } = require('../middlewares/auth');
const { handleCreateProduct } = require('../controller/productController');

const productRouter = express.Router();

productRouter.post('/',upload.single('image'),handleCreateProduct);


module.exports = {productRouter}