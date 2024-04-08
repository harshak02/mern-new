import jwt from "jsonwebtoken";

const jwtTokenGen = (user, statusCode, res) => {
  const tokenObject = {
    user,
  };

  const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
    expiresIn: "4h",
  });

  res.cookie("jwtCookie", jwtToken, {
    maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  return res.status(statusCode).json({
    message: "Logged In",
    jwtToken,
    tokenObject,
  });
};

export default jwtTokenGen;
