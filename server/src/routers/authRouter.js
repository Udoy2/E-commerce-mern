const express = require('express');
const { runValidation } = require('../validators');
const { handleLogin, handleLogout } = require('../controller/authController');

const authRouter = express.Router();

authRouter.post("/login",handleLogin)
authRouter.post("/logout",handleLogout)


module.exports = {authRouter}