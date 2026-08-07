import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postSlice";

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="post-list">
      <h2>Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>

            <p>{post.content}</p>

            <p>
              <strong>Platform:</strong> {post.platform}
            </p>

            <p>
              <strong>Status:</strong> {post.status}
            </p>

            <button
              className="delete-btn"
              onClick={() => handleDelete(post.id)}
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;