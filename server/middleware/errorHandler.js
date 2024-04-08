//will handle ultimately the next(err) correct

const errorHandlerModule = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //we can have the error msgs
  //jwt errors
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid try again. Invalid`;
  }

  //jwt expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired try again. Invalid`;
  }

  if (err.name === "MongoServerError") {
    const message = `Duplicate Emails are not allowed`;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorHandlerModule;
