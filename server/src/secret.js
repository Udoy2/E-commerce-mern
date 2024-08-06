require('dotenv').config()
const serverPort = process.env.SERVER_PORT || 8000;
const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernDB"
const userDefaultImage = process.env.USER_DEFAULT_IMAGE || "/public/images/userImages/default_icon.png"
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "DUMMY"
module.exports = {
    serverPort,
    mongodbURL,
    userDefaultImage,
    jwtActivationKey
}