import express from "express";
import {
  getAllUsers,
  getCurrentUser,
  getOneUser,
  getOneUserNotes,
  logoutUser,
  signInUser,
  signUpUser,
  getCompleteData
} from "../controllers/userController";
import { ensureAuth, ensureAuthorization } from "../middleware/ensureAuth";
import {
  userSignInValidation,
  userSignUpValidation,
} from "../middleware/validation";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/currentuser", ensureAuth, getCurrentUser);
userRouter.get("/:id", ensureAuth, getOneUser);
userRouter.post("/signup", userSignUpValidation, signUpUser);
userRouter.post("/signin", userSignInValidation, signInUser);
userRouter.post("/signout", ensureAuth, logoutUser);
userRouter.get("/:id", ensureAuth, getOneUserNotes);

//admin routes (sample one but many more to come)
userRouter.get("/admin/getdata",ensureAuth,ensureAuthorization("admin"),getCompleteData);
export default userRouter;
