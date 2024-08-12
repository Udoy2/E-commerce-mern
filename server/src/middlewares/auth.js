const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../secret');
const isLoggedIn = async(req,res,next) => {
    try {
        const token = req.cookies.accessToken;
        if(!token) throw createHttpError(401,'Access token not found');
        const decoded = jwt.verify(token,jwtAccessKey);
        if(!decoded) throw createHttpError(401,'Invalid Access token , please login again');
        req.userId = decoded._id;
        next()
        
    } catch (error) {
        return next(error);
    }
}

module.exports = {isLoggedIn}