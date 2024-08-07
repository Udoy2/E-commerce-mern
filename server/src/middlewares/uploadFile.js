const multer = require("multer");
const path = require("path");
const { uploadDirectory, maxFileSize, allowedFileTypes } = require("../secret");
const createHttpError = require("http-errors");

const UPLOAD_DIR = uploadDirectory;
const UPLOAD_FILE_SIZE = maxFileSize;
const ALLOWED_FILE_TYPES = allowedFileTypes;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + extname);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  console.log(ALLOWED_FILE_TYPES);
  
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {
    const error = createHttpError(400, "File type not allowed");
    return cb(error);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: UPLOAD_FILE_SIZE },
  fileFilter,
});
module.exports = { upload };
