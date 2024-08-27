const multer = require("multer");
const {
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
} = require("../config");
const path = require('path');

const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, 'public/images/users'); // Set upload directory
  // },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Set filename
  }
});
const fileFilter = (req, file, cb) => {
  if(!file.mimetype.startsWith("image/")){
    return cb(new Error('Only image files are allowed!'),false)
  }
  if(file.size > MAX_FILE_SIZE){
    return cb(new Error('File size exxceeds the maximum limit'),false);
  }
  if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
    return cb(new Error('File type is not allowed'),false);

  }
  cb(null,true)
};

const uploadProduct = multer({
  storage: storage,
  fileFilter:fileFilter,
});

const userUpload = multer({
  storage:storage,
  fileFilter:fileFilter
})
module.exports = { uploadProduct,userUpload };
