const express = require('express');
const { getUsers,getUser, deleteUser, processRegister, activateUserAccount, updateUserById } = require('../controller/userController');
const { upload } = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const { runValidation } = require('../validators');
const { isLoggedIn, isLoggedOUT, isAdmin } = require('../middlewares/auth');
const userRouter = express.Router();

userRouter.get('/',isLoggedIn,isAdmin,getUsers)
userRouter.get('/:id',isLoggedIn,getUser)
userRouter.put('/:id',isLoggedIn,upload.single("image"),updateUserById)
userRouter.delete('/:id',isLoggedIn,deleteUser)

userRouter.post('/process-register',isLoggedOUT,upload.single("image"),validateUserRegistration,runValidation,processRegister)
userRouter.post('/activate',isLoggedOUT,activateUserAccount)

module.exports = {userRouter}