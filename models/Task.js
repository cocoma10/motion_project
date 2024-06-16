import mongoose,{Schema} from "mongoose";
const taskSchema = new Schema({
    user_id:String,
    task: String,
  

},{
    timestamps:true,
});

const Task=mongoose.models.Task || mongoose.model('Task',taskSchema);

export default Task;

