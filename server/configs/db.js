import { connect } from "http2";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB is connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/ai-powered-blog`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
