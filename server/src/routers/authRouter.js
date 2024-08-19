const express = require('express');
const { runValidation } = require('../validators');
const { handleLogin, handleLogout, handleForgetPassword, handleResetPassword, handleRefreshToken, handleProtectedRoute } = require('../controller/authController');
const { isLoggedOUT, isLoggedIn } = require('../middlewares/auth');
const { validateUserLogin, forgetPasswordValidator, resetPasswordValidator } = require('../validators/auth');
const { successResponse } = require('../controller/responseController');

const authRouter = express.Router();

authRouter.post("/login",validateUserLogin,runValidation,isLoggedOUT,handleLogin);
authRouter.post("/logout",isLoggedIn,handleLogout);
authRouter.post('/forget-password',forgetPasswordValidator,runValidation,isLoggedOUT,handleForgetPassword);
authRouter.put('/reset-password',resetPasswordValidator,runValidation,isLoggedOUT,handleResetPassword);
authRouter.get('/refresh-token',handleRefreshToken);
authRouter.get('/protected',handleProtectedRoute);

authRouter.post("/test",(req,res,next)=>{
    return successResponse(res,{
        statusCode:200,
        message:'hello',
        payload:{data: req.body}
    })
})

module.exports = {authRouter}