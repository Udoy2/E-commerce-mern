const express = require('express');
const { getUsers,getUser, deleteUser, processRegister } = require('../controller/userController');
const userRouter = express.Router();

userRouter.get('/',getUsers)
userRouter.get('/:id',getUser)
userRouter.delete('/:id',deleteUser)
userRouter.post('/process-register',processRegister)


module.exports = {userRouter}