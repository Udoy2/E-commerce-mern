const isLoggedIn = async(req,res,next) => {
    try {
        const token = req.cookies.accessToken;
        console.log(token);
        next()
        
    } catch (error) {
        return next(error);
    }
}

module.exports = {isLoggedIn}