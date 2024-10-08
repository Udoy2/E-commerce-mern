require('dotenv').config()
const serverPort = process.env.SERVER_PORT || 8000;
const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernDB"
const userDefaultImage = process.env.USER_DEFAULT_IMAGE || "/public/images/userImages/default_icon.png"
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "DUMMY"
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "DUMMY"
const smtpUsername = process.env.SMTP_USERNAME || ""
const smtpPasword = process.env.SMTP_PASSWORD || ""
const clientUrl = process.env.CLIENT_URL || ""
const cloudinary_name = process.env.CLOUDINARY_NAME||""
const cloudinary_api_key = process.env.CLOUDINARY_API_KEY||""
const cloudinary_api_secrect = process.env.CLOUDINARY_API_SECRET||""



module.exports = {
    serverPort,
    mongodbURL,
    userDefaultImage,
    jwtActivationKey,
    smtpUsername,
    smtpPasword,
    clientUrl,
    jwtAccessKey,
    cloudinary_name,
    cloudinary_api_key,
    cloudinary_api_secrect
}