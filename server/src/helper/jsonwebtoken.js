const jwt = require("jsonwebtoken");

const createJSONWebToken = (payload, key, expiresIn) => {
    console.log(payload);
    
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
    console.log("Failed to sign the JWT:", error);
    throw error;
  }
};

module.exports = { createJSONWebToken };
