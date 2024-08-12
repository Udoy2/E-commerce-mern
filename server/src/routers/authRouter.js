const express = require('express');
const { runValidation } = require('../validators');
const { handleLogin, handleLogout } = require('../controller/authController');
const { isLoggedOUT, isLoggedIn } = require('../middlewares/auth');

const authRouter = express.Router();

authRouter.post("/login",isLoggedOUT,handleLogin)
authRouter.post("/logout",isLoggedIn,handleLogout)


module.exports = {authRouter}