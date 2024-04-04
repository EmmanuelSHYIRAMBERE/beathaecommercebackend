import jwt from "jsonwebtoken";
import { catchAsyncError } from "../utility/catchSync";

export const verifyToken = catchAsyncError((req, res, next) => {
  let authorization = req.headers.authorization;

  let tokenAuth = authorization?.split(" ")[1];

  if (!tokenAuth) {
    return res.status(401).json({
      message: "please, provide the valid access token!",
    });
  }

  jwt.verify(tokenAuth, process.env.JWT_SECRET_KEY, (err, verified) => {
    if (err) {
      return res.status(401).json({
        message: err.message,
      });
    }

    req.user = verified;
    req.UserId = verified._id;
    req.userEmail = verified.email;
    req.userNames = verified.fullNames;
    next();
  });
});
