const multer = require("multer");
const path = require("path");
const createHttpError = require("http-errors");
const {
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  UPLOAD_DIRECTORY,
} = require("../config");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIRECTORY);
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
    return cb(new Error("File type not allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});
module.exports = { upload };
