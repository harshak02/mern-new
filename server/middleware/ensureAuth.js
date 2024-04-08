import CustomError from "../utils/createError";
import jwt from "jsonwebtoken";

export const ensureAuth = async (req, res, next) => {
  const cookie = req.cookies.jwtCookie;
  if (!cookie) {
    return next(new CustomError("Token is Not Available! Log In again", 401));
  }

  try {
    const decoded = jwt.verify(cookie, process.env.SECRET);
    req.user = decoded.user;
    return next();
  } catch (err) {
    return next(new CustomError(`Token is Expired! Log In again ${err}`, 402));
  }
};

export const ensureAuthorization = (...roles) => {
  return (req,res,next) => {
    if(!roles.includes(req.user.role)){
      return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this role`,403));
    }
    next();
  }
}