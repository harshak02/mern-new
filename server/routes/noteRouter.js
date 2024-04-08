import express from "express";
import { ensureAuth } from "../middleware/ensureAuth";
import {
  createOneNote,
  deleteOneNote,
  getAllNotes,
  getOneNote,
  updateOneNote,
} from "../controllers/noteController";
import { noteValidation } from "../middleware/validation";

const noteRouter = express.Router();

noteRouter.get("/", getAllNotes);
noteRouter.get("/:id", ensureAuth, getOneNote);
noteRouter.post("/create", ensureAuth, noteValidation, createOneNote);
noteRouter.put("/update/:id", ensureAuth, noteValidation, updateOneNote);
noteRouter.delete("/delete/:id", ensureAuth, deleteOneNote);

export default noteRouter;
