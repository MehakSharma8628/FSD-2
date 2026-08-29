import React from "react";
import { useSelector } from "react-redux";

const StatsCards = () => {
  const posts = useSelector((state) => state.posts.posts);
  const platforms = useSelector((state) => state.platforms.platforms);

  const totalPosts = posts.length;
  const published = posts.filter(
    (post) => post.status === "Published"
  ).length;

  const drafts = posts.filter(
    (post) => post.status === "Draft"
  ).length;

  return (
    <div className="stats-container">
      <div className="card">
        <h2>{totalPosts}</h2>
        <p>Total Posts</p>
      </div>

      <div className="card">
        <h2>{published}</h2>
        <p>Published</p>
      </div>

      <div className="card">
        <h2>{drafts}</h2>
        <p>Drafts</p>
      </div>

      <div className="card">
        <h2>{platforms.length}</h2>
        <p>Platforms</p>
      </div>
    </div>
  );
};

export default StatsCards;