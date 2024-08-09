const express = require('express');
const { getUsers,getUser, deleteUser, processRegister, activateUserAccount, updateUserById } = require('../controller/userController');
const { upload } = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const { runValidation } = require('../validators');
const userRouter = express.Router();

userRouter.get('/',getUsers)
userRouter.get('/:id',getUser)
userRouter.post('/process-register',upload.single("image"),validateUserRegistration,runValidation,processRegister)
userRouter.post('/verify',activateUserAccount)
userRouter.delete('/:id',deleteUser)
userRouter.put('/:id',updateUserById)

module.exports = {userRouter}