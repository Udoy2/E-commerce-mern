const { cloudinary } = require("../config/cloudinary");

const uploadImageToCloudinary = async (imagePath) => {
    const response = await cloudinary.uploader.upload(imagePath,{
        folder:'ecommerceMern',
      });
      return response.secure_url
}

function getFileNameWithoutExtension(url) {
    // Use URL to get the pathname
    const path = new URL(url).pathname;
    
    // Extract the filename from the path
    const fileNameWithExtension = path.substring(path.lastIndexOf('/') + 1);
    
    // Remove the extension
    const fileNameWithoutExtension = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));
    
    return fileNameWithoutExtension;
  }

module.exports = {uploadImageToCloudinary,getFileNameWithoutExtension}