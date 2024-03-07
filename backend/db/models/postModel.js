import mongoose from "mongoose";
import postSchema from "../schemas/postSchema.js";

const postModel = mongoose.model("posts", postSchema);

export default postModel;
