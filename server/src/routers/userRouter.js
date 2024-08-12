const express = require('express');
const { getUsers,getUser, deleteUser, processRegister, activateUserAccount, updateUserById } = require('../controller/userController');
const { upload } = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const { runValidation } = require('../validators');
const { isLoggedIn } = require('../middlewares/auth');
const userRouter = express.Router();

userRouter.get('/',isLoggedIn,getUsers)
userRouter.get('/:id',isLoggedIn,getUser)
userRouter.put('/:id',isLoggedIn,upload.single("image"),updateUserById)
userRouter.delete('/:id',isLoggedIn,deleteUser)

userRouter.post('/process-register',upload.single("image"),validateUserRegistration,runValidation,processRegister)
userRouter.post('/activate',activateUserAccount)

module.exports = {userRouter}