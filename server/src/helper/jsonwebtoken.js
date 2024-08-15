const jwt = require("jsonwebtoken");
const { logger } = require("../controller/loggerController");

const createJSONWebToken = (payload, key, expiresIn) => {
    
  if (typeof(payload) != "object" || !payload) {
    throw new Error("Payload must be non-empty object");
  }

  if (typeof(key) != "string" || !key) {
    throw new Error("Secret key must be non-empty string");
  }
  try {
    const token = jwt.sign(payload, key, { expiresIn: expiresIn });
    return token;
  } catch (error) {
    logger.log("info","Failed to sign the JWT:", error);
    throw error;
  }
};

module.exports = { createJSONWebToken };
