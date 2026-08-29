import { useState } from "react";
import "./PostComposer.css";

function PostComposer() {
  const [post, setPost] = useState("");
  const [platform, setPlatform] = useState("");
  const [message, setMessage] = useState("");

  const limits = {
    Twitter: 200,
    LinkedIn: 300,
    Instagram: 250,
    Facebook: 600,
  };

  const handlePublish = () => {
    setMessage(`Post published successfully on ${platform}!`);
  };

  return (
    <div className="container">
      <h1>Multi Platform Post Composer</h1>

      <textarea
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => {
          setPost(e.target.value);
          setMessage("");
        }}
      ></textarea>

      <p>
        <strong>Characters:</strong> {post.length}
      </p>

      <h3>Select Platform</h3>

      <div className="platforms">
        <label>
          <input
            type="radio"
            name="platform"
            value="Twitter"
            checked={platform === "Twitter"}
            onChange={(e) => setPlatform(e.target.value)}
          />
          Twitter
        </label>

        <label>
          <input
            type="radio"
            name="platform"
            value="LinkedIn"
            checked={platform === "LinkedIn"}
            onChange={(e) => setPlatform(e.target.value)}
          />
          LinkedIn
        </label>

        <label>
          <input
            type="radio"
            name="platform"
            value="Instagram"
            checked={platform === "Instagram"}
            onChange={(e) => setPlatform(e.target.value)}
          />
          Instagram
        </label>

        <label>
          <input
            type="radio"
            name="platform"
            value="Facebook"
            checked={platform === "Facebook"}
            onChange={(e) => setPlatform(e.target.value)}
          />
          Facebook
        </label>
      </div>

      <h3>Selected Platform</h3>

      <p>{platform ? platform : "No platform selected"}</p>

      {platform && (
        <div className="result">
          <h4>{platform}</h4>

          <p>
            {post.length} / {limits[platform]} characters
          </p>

          {post.length > limits[platform] ? (
            <p className="error">
              Character limit exceeded by {post.length - limits[platform]}
            </p>
          ) : (
            <p className="success">Post is Valid</p>
          )}
        </div>
      )}

      <button
        className="publishBtn"
        disabled={!platform || post.length > limits[platform]}
        onClick={handlePublish}
      >
        Publish Post
      </button>

      {message && <h3 className="success">{message}</h3>}
    </div>
  );
}

export default PostComposer;