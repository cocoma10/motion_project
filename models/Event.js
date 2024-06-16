import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  allDay: {
    type: Boolean,
    default: false,
  },
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
