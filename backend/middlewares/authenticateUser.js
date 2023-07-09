require("dotenv").config();
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not authorized");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = {
      userId: decoded.userId,
      account: decoded.account,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not Authirized");
  }
};

module.exports = authenticateUser;
