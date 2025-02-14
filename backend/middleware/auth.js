import jwt from "jsonwebtoken";
import User from "../user/userModel.js";
import asyncHandler from "./asyncHandler.js";

//Check for user is authenticated or not
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //Read jwt from jwt cookie
  token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    //console.log("Authenticated user:", req.user);
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, Token failed.");
  }
});

//Check if user is Admin
const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("Not authorized, user not found");
  }
  if (!req.user.isAdmin) {
    return res.status(403).send("Not authorized as an admin");
  }

  next();
};

export { authenticate, authorizeAdmin };
