import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token.");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      req.user = user;
      // console.log("Decoded from protect : ", decoded);

      next();
    } catch (error) {
      console.error(error);
      res.status(401).end();
      throw new Error("Not authorized, token failed.");
    }
  }
});

const forAdmin = (req, res, next) => {
  if (req.user && (req.user.isAdmin)) {
    next();
  } else if (req.user && (req.user.isMerchant)) {
    next();
  } else {
    res.status(401).json({
      message: "Not authorized as Admin.",
    });
  }
};

// const forMerchant = (req, res, next) => {
//   if (req.user && req.user.isMerchant) {
//     next();
//   } else {
//     res.status(401).json({
//       message: "Not authorized as Merchant.",
//     });
//   }
// };

export { protect, forAdmin };
