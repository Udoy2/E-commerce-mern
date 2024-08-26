const { cloudinary } = require("../config/cloudinary");

const uploadImageToCloudinary = async (imagePath) => {
    const response = await cloudinary.uploader.upload(imagePath,{
        folder:'ecommerceMern',
      });
      return response.secure_url
}

module.exports = {uploadImageToCloudinary}