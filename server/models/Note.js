import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  creatorid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Creator Id is required."],
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  content: {
    type: String,
    required: [true, "Content is required."],
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

NoteSchema.index({ creatorid: 1, title: 1 }, { unique: true });

const Note = mongoose.model("Note", NoteSchema);
export default Note;
