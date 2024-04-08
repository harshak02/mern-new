import handleAsyncError from "../middleware/catchAsyncError";
import User from "../models/User";
import CustomError from "../utils/createError";
import bcrypt from "bcrypt";
import jwtTokenGen from "../utils/jsonwebtoken";

//get all Users
export const getAllUsers = handleAsyncError(async (req, res, next) => {
  const users = await User.find();
  if (!users || users.length === 0) {
    return next(new CustomError("No users registered.", 404));
  } else {
    res.status(200).json({
      message: "success",
      users,
    });
  }
});

//get Current User
export const getCurrentUser = handleAsyncError(async (req, res, next) => {
  const id = req.user._id;
  let currentUser;

  try {
    currentUser = await User.findById(id);
  } catch (err) {
    return next(new CustomError("Error in fetching the user.", 500));
  }

  return res.status(200).json({
    message: "Successfully fetched User",
    user: currentUser,
  });
});

//get One User
export const getOneUser = handleAsyncError(async (req, res, next) => {
  const id = req.params.id;
  let existingUser;

  try {
    existingUser = await User.findById(id);
  } catch (err) {
    return next(new CustomError("Error in fetching the user.", 500));
  }

  return res.status(200).json({
    message: "Successfully fetched User",
    user: existingUser,
  });
});

//Sign Up the User
export const signUpUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new CustomError("Duplicates emails are not allowed", 401));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  let user;

  try {
    user = await newUser.save();
    res.status(200).json({
      message: "success",
      user,
    });
  } catch (err) {
    return next(new CustomError("Internal Server Error in SignUp", 505));
  }
});

//Sign In the User
export const signInUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return next(new CustomError(`User not found`, 401));
  }

  const isEqual = await bcrypt.compare(password, existingUser.password);

  if (!isEqual) {
    return next(new CustomError(`Password not matched`, 401));
  }

  //no need of next here as it is not middle ware
  return jwtTokenGen(existingUser, 200, res);
});

//Log Out the User
export const logoutUser = handleAsyncError(async (req, res, next) => {
  res.clearCookie("jwtCookie");
  res.status(200).json({
    message: "Logout successful",
  });
});

//get one user notes
export const getOneUserNotes = handleAsyncError(async (req, res, next) => {
  const id = req.params.id;
  let notes;

  try {
    notes = await User.findById(id).populate("notes");
  } catch (err) {
    return next(
      new CustomError(`Error in fetching the user notes. ${err}`, 500)
    );
  }

  if (!notes) {
    return next(new CustomError("Error in fetching the user notes.", 500));
  }

  res.status(200).json({
    message: "Fetched User's all notes",
    notes,
  });
});



export const getCompleteData = handleAsyncError(async (req, res, next) => {

  let data;
  try {
    data = await User.find().populate("notes");
  } catch (error) {
    return next(new CustomError("Error in fetching complete data.", 500));
  }

  return res.status(200).json({
    message : "Successful In fetching complete data",
    data
  })
});
