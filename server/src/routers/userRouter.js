const express = require('express');
const { getUsers,getUser, deleteUser, processRegister, activateUserAccount } = require('../controller/userController');
const { upload } = require('../middlewares/uploadFile');
const userRouter = express.Router();

userRouter.get('/',getUsers)
userRouter.get('/:id',getUser)
userRouter.delete('/:id',deleteUser)
userRouter.post('/process-register',upload.single("image"),processRegister)
userRouter.post('/verify',activateUserAccount)

module.exports = {userRouter}