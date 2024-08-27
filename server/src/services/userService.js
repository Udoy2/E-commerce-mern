const createHttpError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("../controller/responseController");
const { emailWithNodeMailer } = require("../helper/email");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { jwtActivationKey, clientUrl } = require("../secret");
const { uploadImageToCloudinary } = require("../helper/cloudinaryHelper");
const { deleteImage } = require("../helper/deleteImage");

const findUsers = async (search, limit, page) => {
  try {
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };
    const users = await User.find(filter, options)
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await User.find(filter).countDocuments();
    if (!users) throw createHttpError(404, "no users found");
    return {
      users,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currentPage: page,
        previousPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    };
  } catch (error) {
    throw error;
  }
};

const handleEmailAndGenerateToken = async (
  name,
  email,
  password,
  phone,
  address,
  imageBufferString
) => {
  try {
    const userExists = await User.exists({ email: email });
    if (userExists)
      throw createHttpError(
        409,
        "User with this already exists, Please log in"
      );

    // create jwt
    const token = createJSONWebToken(
      { name, email, password, phone, address, image: imageBufferString },
      jwtActivationKey,
      "15m"
    );

    // email
    const emailData = {
      email,
      subject: "Account Activation Email",
      html: `
              <h2> Hello ${name} <h2>
              <p> Please Click here to <a href="${clientUrl}/api/users/activate/${token} target='_blank'"> activate </a> </p>
            `,
    };
    try {
      emailWithNodeMailer(emailData);
    } catch (error) {
      next(createHttpError(500, "Failed to send verification email"));
    }
    return token;
  } catch (error) {
    throw error;
  }
};

const handleAvatarUpload = async (id,imagePath,folderLocation) => {
  try {
    const secure_url = await uploadImageToCloudinary(imagePath,folderLocation);
    const update = { image: secure_url };
    await User.findByIdAndUpdate(id, update);
  } catch (error) {
    throw error;
  }
};

module.exports = { findUsers, handleEmailAndGenerateToken,handleAvatarUpload };
