const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../secret');
const isLoggedIn = async(req,res,next) => {
    try {
        const token = req.cookies.accessToken;
        if(!token) throw createHttpError(401,'Access token not found');
        const decoded = jwt.verify(token,jwtAccessKey);
        if(!decoded) throw createHttpError(401,'Invalid Access token , please login again');
        req.body.userId = decoded._id;
        next()
        
    } catch (error) {
        return next(error);
    }
}
const isLoggedOUT = async(req,res,next) => {
    try {
        const token = req.cookies.accessToken;
        if(token) {
            const decoded = jwt.verify(token,jwtAccessKey);
            if(decoded) throw createHttpError(401,'User is already loggedIN');
        };
        next()
        
    } catch (error) {
        return next(error);
    }
}
const isAdmin = async(req,res,next) => {
    try {
        const token = req.cookies.accessToken;
        if(!token) throw createHttpError(401,'Access token not found');
        const {user} = jwt.verify(token,jwtAccessKey);
        if(!user) throw createHttpError(401,'Invalid Access token , please login again');
        if(!user.isAdmin) throw createHttpError(401,'Unauthorised! You have to be a admin to access this page!');
        
        next()
        
    } catch (error) {
        return next(error);
    }
}
module.exports = {isLoggedIn,isLoggedOUT,isAdmin}