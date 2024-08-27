const { cloudinary } = require("../config/cloudinary");

const uploadImageToCloudinary = async (imagePath,folderLocation) => {
    const response = await cloudinary.uploader.upload(imagePath,{
        folder:folderLocation,
      });
      return response.secure_url
}
const deleteImageFromCloudinary = async (imagePath,folderLocation) => {
  const publicID = getFileNameWithoutExtension(imagePath);
      const {result} = await cloudinary.uploader.destroy(`${folderLocation}/${publicID}`)
      console.log(result);
      if(result == 'not found'){
        return 'not found'
      }
      if(result != 'ok'){
        throw new Error(
          'image was not deleted successfully from cloudinary, please try again'
        )
      }
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

module.exports = {uploadImageToCloudinary,getFileNameWithoutExtension,deleteImageFromCloudinary}