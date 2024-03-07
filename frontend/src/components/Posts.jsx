import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from a mock API
    fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          navigate("/");
          return;
        }
        setPosts(data.posts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="h-[calc(100%-64px)] overflow-y-scroll bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Posts</h1>
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg mb-6 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-2">{post.message}</p>
            <p className="mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm mr-2"
                >
                  #{tag}
                </span>
              ))}
            </p>

            <div className="flex items-center justify-between text-gray-600">
              <p className="text-sm">Creator: User {post.creator}</p>
              <p className="text-sm">
                Created at: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
