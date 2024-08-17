const express = require('express');
const { runValidation } = require('../validators');
const { validateCategory } = require('../validators/category');
const { isLoggedIn, isLoggedOUT, isAdmin } = require('../middlewares/auth');
const categoryRouter = express.Router();
categoryRouter.post('/',(req,res,next)=>{

});


module.exports = {categoryRouter};