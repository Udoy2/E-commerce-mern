const User = require("../models/userModel");
const createHttpError = require("http-errors");
const { successResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { findWithID } = require("../services/findWithID");
const { deleteImage } = require("../helper/deleteImage");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const { jwtActivationKey, clientUrl } = require("../secret");
const { emailWithNodeMailer } = require("../helper/email");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

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
    return successResponse(res, {
      statusCode: 200,
      message: "user were returned Successfully",
      payload: {
        users,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
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
    const userImagePath = user.image;
    deleteImage(userImagePath);
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
    const imageBufferString = req.file.buffer.toString("base64");

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
      "10m"
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
const activateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) throw createHttpError(404, "Token not found!");
    const decoded = jwt.verify(token, jwtActivationKey);
    const userExists = await User.exists({ email: decoded.email });
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
    await findWithID(User, userID, {});
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
      throw createHttpError(400,"Email can not be updated!");
    }
    const image = req.file;
    if (image) {
      if (image.size > 2 * 1024 * 1024) {
        throw createHttpError(400, "Image file cant exceede 2mb");
      }
      updates.image = image.buffer.toString("base64");
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
module.exports = {
  getUsers,
  getUser,
  deleteUser,
  processRegister,
  activateUserAccount,
  updateUserById,
};
// data