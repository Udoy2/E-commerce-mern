const express = require('express');
const { runValidation } = require('../validators');
const { handleLogin, handleLogout } = require('../controller/authController');
const { isLoggedOUT, isLoggedIn } = require('../middlewares/auth');
const { validateUserLogin } = require('../validators/auth');

const authRouter = express.Router();

authRouter.post("/login",validateUserLogin,runValidation,isLoggedOUT,handleLogin)
authRouter.post("/logout",isLoggedIn,handleLogout)


module.exports = {authRouter}