const { cloudinary_name, cloudinary_api_key, cloudinary_api_secrect } = require("../secret");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secrect, 
});

module.exports = {cloudinary}