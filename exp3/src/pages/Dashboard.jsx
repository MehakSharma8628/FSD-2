import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to Post Composer",
      content:
        "This is the first post. Admin can edit or delete it.",
    },
    {
      id: 2,
      title: "Role Based Access Control",
      content:
        "Different users get different permissions.",
    },
  ]);

  const [viewPost, setViewPost] = useState(null);
  const [editPost, setEditPost] = useState(null);

  if (!user) {
    return <Navigate to="/" />;
  }

  const permissions = {
    View: ["Admin", "Editor", "Viewer"],
    Create: ["Admin", "Editor"],
    Edit: ["Admin", "Editor"],
    Delete: ["Admin"],
  };

  const hasPermission = (permission) => {
    return permissions[permission].includes(user.role);
  };

  /* CREATE POST */

  const createPost = (e) => {
    e.preventDefault();

    if (!hasPermission("Create")) {
      alert("You do not have permission to create posts.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
    };

    setPosts([...posts, newPost]);

    setTitle("");
    setContent("");
  };

  /* VIEW POST */

  const handleView = (post) => {
    if (!hasPermission("View")) {
      alert("You do not have permission to view posts.");
      return;
    }

    setViewPost(post);
  };

  /* EDIT POST */

  const handleEdit = (post) => {
    if (!hasPermission("Edit")) {
      alert("You do not have permission to edit posts.");
      return;
    }

    setEditPost({
      ...post,
    });
  };

  /* SAVE EDIT */

  const saveEdit = (e) => {
    e.preventDefault();

    setPosts(
      posts.map((post) =>
        post.id === editPost.id
          ? editPost
          : post
      )
    );

    setEditPost(null);
  };

  /* DELETE POST */

  const deletePost = (id) => {
    if (!hasPermission("Delete")) {
      alert("You do not have permission to delete posts.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      setPosts(
        posts.filter((post) => post.id !== id)
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="main-container">

        {/* PERMISSIONS */}

        <section className="section-box">

          <h2>Your Permissions</h2>

          <div className="permissions">

            {Object.keys(permissions).map(
              (permission) => {

                const allowed =
                  hasPermission(permission);

                return (
                  <div
                    className="permission-card"
                    key={permission}
                  >

                    <h3>
                      {permission === "View" && "👁️"}
                      {permission === "Create" && "✍️"}
                      {permission === "Edit" && "📝"}
                      {permission === "Delete" && "🗑️"}

                      {" "}

                      {permission}
                    </h3>

                    <p
                      className={
                        allowed
                          ? "allowed"
                          : "denied"
                      }
                    >
                      {allowed
                        ? "Allowed"
                        : "Denied"}
                    </p>

                  </div>
                );
              }
            )}

          </div>

        </section>


        {/* CREATE POST */}

        {hasPermission("Create") && (
          <section className="section-box">

            <h2>Create New Post</h2>

            <form onSubmit={createPost}>

              <input
                className="post-title"
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

              <textarea
                placeholder="Write your post..."
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                required
              />

              <button
                className="create-btn"
                type="submit"
              >
                Create & Save Post
              </button>

            </form>

          </section>
        )}


        {/* ALL POSTS */}

        {hasPermission("View") && (
          <section className="section-box">

            <div className="posts-header">

              <h2>All Posts</h2>

              <span>
                {posts.length} posts
              </span>

            </div>

            <div className="posts">

              {posts.length === 0 ? (
                <p>No posts available.</p>
              ) : (

                posts.map((post) => (

                  <div
                    className="post"
                    key={post.id}
                  >

                    <div className="post-content">

                      <h3>{post.title}</h3>

                      <p>{post.content}</p>

                    </div>

                    <div className="post-actions">

                      {/* VIEW */}

                      <button
                        className="view-btn"
                        onClick={() =>
                          handleView(post)
                        }
                      >
                        View
                      </button>


                      {/* EDIT */}

                      {hasPermission("Edit") && (
                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(post)
                          }
                        >
                          Edit
                        </button>
                      )}


                      {/* DELETE */}

                      {hasPermission("Delete") && (
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deletePost(post.id)
                          }
                        >
                          Delete
                        </button>
                      )}

                    </div>

                  </div>

                ))

              )}

            </div>

          </section>
        )}


        {/* VIEW MODAL */}

        {viewPost && (

          <div className="modal-overlay">

            <div className="modal">

              <h2>{viewPost.title}</h2>

              <p>{viewPost.content}</p>

              <button
                className="close-btn"
                onClick={() =>
                  setViewPost(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        )}


        {/* EDIT MODAL */}

        {editPost && (

          <div className="modal-overlay">

            <div className="modal">

              <h2>Edit Post</h2>

              <form onSubmit={saveEdit}>

                <input
                  className="post-title"
                  type="text"
                  value={editPost.title}
                  onChange={(e) =>
                    setEditPost({
                      ...editPost,
                      title: e.target.value,
                    })
                  }
                  required
                />

                <textarea
                  value={editPost.content}
                  onChange={(e) =>
                    setEditPost({
                      ...editPost,
                      content: e.target.value,
                    })
                  }
                  required
                />

                <div className="modal-buttons">

                  <button
                    className="create-btn"
                    type="submit"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="close-btn"
                    onClick={() =>
                      setEditPost(null)
                    }
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </main>
    </>
  );
};

export default Dashboard;