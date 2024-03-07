import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export default postSchema;
