import mongoose, { Schema } from "mongoose";
// 1create Schema
// 2model of schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Note = mongoose.model("Note", noteSchema);//createAT updte
export default Note;
