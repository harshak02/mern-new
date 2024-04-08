import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "User name is required."],
    unique: [true, "User name should be unique"],
  },
  email: {
    type: String,
    required: [true, "User name is required."],
    unique: [true, "Email should be unique"],
  },
  password: {
    type: String,
    required: [true, "User name is required."],
    minlength: [6, "Password should be greater than 6 characters."],
  },
  created_timeStamp: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updated_timeStamp: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
