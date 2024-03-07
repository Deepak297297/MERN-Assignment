import Post from "../db/models/postModel.js";

export default async function (req, res) {
  const posts = await Post.find({});
  res.status(200).json({ posts });
}
