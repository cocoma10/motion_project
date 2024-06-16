import mongoose, { Schema } from "mongoose";
const playlistSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);

export default Playlist;
