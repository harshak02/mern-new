import Joi from "joi";
import CustomError from "../utils/createError";

export const userSignUpValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (!error) {
    return next();
  } else {
    return next(
      new CustomError(
        `Please Enter the Valid Formats in User SignIn/SignUp. ${error}`,
        401
      )
    );
  }
};

export const userSignInValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (!error) {
    return next();
  } else {
    return next(
      new CustomError(
        "Please Enter the Valid Formats in User SignIn/SignUp.",
        401
      )
    );
  }
};

export const noteValidation = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(20).required(),
    content: Joi.string().min(4).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (!error) {
    return next();
  } else {
    return next(
      new CustomError("Please Enter the Valid Formats in Note Creation.", 401)
    );
  }
};
