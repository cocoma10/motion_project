import mongoose from "mongoose";

let db;

const connectMdb = async () => {
  if (!db) {
    try {
      db = await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to db sssssssssssssss");
    } catch (error) {
      console.log(error);
    }
  }

  return db;
};

export default connectMdb;