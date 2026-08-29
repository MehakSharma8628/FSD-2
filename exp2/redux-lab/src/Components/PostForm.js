import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postSlice";
import PlatformSelector from "./PlatformSelector";

const PostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [status, setStatus] = useState("Draft");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      addPost({
        title,
        content,
        platform,
        status,
      })
    );

    setTitle("");
    setContent("");
    setPlatform("LinkedIn");
    setStatus("Draft");
  };

  return (
    <div className="form-container">
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your post..."
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <PlatformSelector
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Draft</option>
          <option>Published</option>
        </select>

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default PostForm;