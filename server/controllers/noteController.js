import handleAsyncError from "../middleware/catchAsyncError";
import Note from "../models/Note";
import User from "../models/User";
import CustomError from "../utils/createError";
import mongoose from "mongoose";

//get all notes
export const getAllNotes = handleAsyncError(async (req, res, next) => {
  let notes;
  try {
    notes = await Note.find();
  } catch (err) {
    return next(new CustomError(`The error in fetching All notes ${err}`, 500));
  }

  if (!notes || notes.length === 0) {
    return next(new CustomError(`No notes are available`, 500));
  }

  return res.status(200).json({
    message: "Success",
    notes,
  });
});

//get one note by id
export const getOneNote = handleAsyncError(async (req, res, next) => {
  const id = req.params.id;
  let existingNote;

  try {
    existingNote = await Note.findById(id);
  } catch (err) {
    return next(new CustomError("Error in fetching the Note.", 500));
  }

  return res.status(200).json({
    message: "Successfully fetched Note",
    note: existingNote,
  });
});

//creating note
export const createOneNote = handleAsyncError(async (req, res, next) => {
  const currentUserId = req.user._id;
  const { title, content } = req.body;

  const newNote = new Note({
    creatorid: currentUserId,
    title,
    content,
    created_timeStamp: Date.now(),
  });

  let existingUser;
  try {
    existingUser = await User.findById(currentUserId);
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return next(new CustomError(`The user not found`, 500));
  }

  let note;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    note = await newNote.save({ session });
    existingUser.notes.push(note);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(new CustomError(`The error in creating Note ${err}`, 500));
  }

  return res.status(200).json({
    message: "Created The Note",
    note,
  });
});

//updating note
export const updateOneNote = handleAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const currentUserId = req.user._id;
  const { title, content } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(currentUserId);
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return next(new CustomError(`The user not found`, 500));
  }

  if (!existingUser.notes.includes(id)) {
    return next(new CustomError("You cannot update others notes", 401));
  }

  let existingNote;
  try {
    existingNote = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
        updated_timeStamp: Date.now(),
      },
      { new: true }
    );
  } catch (err) {
    return next(new CustomError(`Problem in Updating the Note ${err}`, 500));
  }

  if (!existingNote) {
    return next(new CustomError(`Problem in Updating the Note ${err}`, 500));
  }

  return res.status(200).json({
    message: "Updated The Note",
    note: existingNote,
  });
});

//delete note
export const deleteOneNote = handleAsyncError(async (req, res, next) => {
  const currentNoteId = req.params.id;
  let existingUser = req.user;
  let existingNote;

  try {
    existingNote = await Note.findOne({ _id: currentNoteId }).populate(
      "creatorid"
    );
  } catch (err) {
    return next(new CustomError(`The Note not found`, 500));
  }

  if (!existingNote) {
    next(new CustomError(`The Note not found`, 500));
    return;
  }

  if (existingNote.creatorid._id.toString() !== existingUser._id.toString()) {
    return next(new CustomError("You cannot delete others notes", 401));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    existingNote.creatorid.notes.pull(currentNoteId);
    await existingNote.creatorid.save({ session });
    await existingNote.deleteOne({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(new CustomError(`Problem in Deleting the Note ${err}`, 500));
  }

  return res.status(200).json({
    message: "Note Deleted",
  });
});
