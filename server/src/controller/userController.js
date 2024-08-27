const User = require("../models/userModel");
const createHttpError = require("http-errors");
const { successResponse } = require("./responseController");
const { findWithID } = require("../services/findWithID");
const { jwtActivationKey } = require("../secret");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  findUsers,
  handleEmailAndGenerateToken,
  handleAvatarUpload,
} = require("../services/userService");
const { checkUserExists } = require("../helper/checkUserExists");
const { cloudinarry, cloudinary } = require("../config/cloudinary");
const { log } = require("winston");
const { deleteImage } = require("../helper/deleteImage");
const { uploadImageToCloudinary, getFileNameWithoutExtension, deleteImageFromCloudinary } = require("../helper/cloudinaryHelper");
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const payload = await findUsers(search, limit, page);
    return successResponse(res, {
      statusCode: 200,
      message: "user were returned Successfully",
      payload,
    });
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };
    const user = await findWithID(User, id, { options: option });
    return successResponse(res, {
      statusCode: 200,
      message: "user were returned Successfully",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const option = { password: 0 };
    const user = await findWithID(User, id, { options: option });
    if(user && user.image){
      await deleteImageFromCloudinary(user.image,'ecommerceMern/users')
      
    }
    await User.findByIdAndDelete({ _id: id, isAdmin: false });
    return successResponse(res, {
      statusCode: 200,
      message: "user were deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const token = await handleEmailAndGenerateToken(
      name,
      email,
      password,
      phone,
      address,
    );
    return successResponse(res, {
      statusCode: 200,
      message:
        "Please go to your email for completing your registration process!",
      payload: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
const uploadAvatar = async (req, res, next) => {
  try {
    const id = req.params.id
    const image = req.file;
    
    if(image){
      await handleAvatarUpload(id,image.path,'ecommerceMern/users')
    }

    return successResponse(res, {
      statusCode: 200,
      message:
        "Avatar uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};
const activateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) throw createHttpError(404, "Token not found!");
    const decoded = jwt.verify(token, jwtActivationKey);
    const userExists = await checkUserExists(decoded.email)
    if (userExists)
      throw createHttpError(
        409,
        "User with this already exists, Please log in"
      );
    await User.create(decoded);
    return successResponse(res, {
      statusCode: 201,
      message: "user was registered successfully",
    });
  } catch (error) {
    next(error);
  }
};
const updateUserById = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const user = await findWithID(User, userID, {});
    const updateOptions = { new: true, runValidators: true, context: "query" };
    const updates = {};
    if (req.body.name) {
      updates.name = req.body.name;
    }
    if (req.body.address) {
      updates.address = req.body.address;
    }
    if (req.body.password) {
      updates.password = req.body.password;
    }
    if (req.body.phone) {
      updates.phone = req.body.phone;
    }
    if (req.body.email) {
      throw createHttpError(400, "Email can not be updated!");
    }
    const image = req.file;
    console.log(image);
    
    if (image) {
      if (image.size > 2 * 1024 * 1024) {
        throw createHttpError(400, "Image file cant exceede 2mb");
      }
      if(user.image){
        
        await deleteImageFromCloudinary(user.image,'ecommerceMern/users');
      }
      const secure_url = await uploadImageToCloudinary(image.path,'ecommerceMern/users');
      updates.image = secure_url
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      updates,
      updateOptions
    ).select("-password");
    if (!updatedUser) {
      throw createHttpError(404, "User does not exists");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "user were updated Successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
const handleBanUserById = async (req, res, next) => {
  try {
    const userID = req.params.id;
    await findWithID(User, userID, {});
    const updates = { isBanned: true };
    const updateOptions = { new: true, runValidators: true, context: "query" };

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      updates,
      updateOptions
    ).select("-password");
    if (!updatedUser) {
      throw createHttpError(404, "User does not exists");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "user were banned Successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
const handleUnBanUserById = async (req, res, next) => {
  try {
    const userID = req.params.id;
    await findWithID(User, userID, {});
    const updates = { isBanned: false };
    const updateOptions = { new: true, runValidators: true, context: "query" };

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      updates,
      updateOptions
    ).select("-password");
    if (!updatedUser) {
      throw createHttpError(404, "User does not exists");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "user were unbanned Successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
const handleUpdatePassword = async (req, res, next) => {
  try {
    const { id, email, oldPassword, newPassword, confirmPassword } = req.body;

    await findWithID(User, id, {});
    const item = await checkUserExists(email);
    if (!item)
      throw createHttpError(
        404,
        `User with this email does not exit with this id`
      );
    const user = await User.findById(id);

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch)
      throw createHttpError(401, "Old password does not match");
    if (newPassword != confirmPassword)
      throw createHttpError(401, "Both password must exactly");

    const options = { new: true, context: "query" };
    const updates = { password: newPassword };
    const updatedUser = User.findByIdAndUpdate(id, updates, options).select(
      "-password"
    );

    return successResponse(res, {
      statusCode: 200,
      message: "password updated Successfully",
      // payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  activateUserAccount,
  updateUserById,
  handleBanUserById,
  handleUnBanUserById,
  handleUpdatePassword,
  uploadAvatar
};
