import mongoose, { Schema } from "mongoose";
const noteSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    NoteColor: {
        type: String,
        required: true,
      },
    description: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
