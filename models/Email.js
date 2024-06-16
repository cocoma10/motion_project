import mongoose,{Schema} from "mongoose";
const emailSchema = new Schema({
    user_id:String,
    email:String,
    message: String,
  

},{
    timestamps:true,
});

const Email=mongoose.models.Email || mongoose.model('Email',emailSchema);

export default Email;

