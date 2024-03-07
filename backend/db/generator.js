import postModel from "./models/postModel.js";

const NoOfPostsToInsert = 100;

const generateRandomPost = () => {
  const title = "Lorem ipsum dolor Post " + Math.floor(Math.random() * 1000);
  const message =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget lectus et lectus convallis condimentum. Proin vel feugiat risus. Nulla ac fringilla dui. Sed feugiat orci eget magna cursus, eu varius arcu varius.";
  const creator = Math.floor(Math.random() * 100);
  const tags = ["tag1", "tag2", "tag3"];
  return { title, message, creator, tags };
};

const insertRandomPosts = async () => {
  const postsToInsert = Array.from(
    { length: NoOfPostsToInsert },
    generateRandomPost
  );
  const result = await postModel.insertMany(postsToInsert);

  console.log(`Posts inserted successfully.`);
};

export default insertRandomPosts;
