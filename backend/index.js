import express from "express";
import cors from "cors";
import rateLimitter from "./middleware/rateLimitter.js";
import auth from "./middleware/auth.js";
import signup from "./controllers/auth.js";
import posts from "./controllers/posts.js";
import mongooseHandle from "./db/index.js";
import insertRandomPosts from "./db/generator.js";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimitter);

app.get("/posts", auth, posts);
app.post("/signup", signup);

app.use((req, res) => {
  res.status(200).json({ message: "Route not found!" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong" });
  console.log(err)
});

app.listen(3001, async () => {
  console.log("Server running on port 3001");
  await mongooseHandle();
  // await insertRandomPosts();
});
