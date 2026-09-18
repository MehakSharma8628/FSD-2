import { useState } from "react";
import "./App.css";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const dates = [
  "Mar 17",
  "Mar 18",
  "Mar 19",
  "Mar 20",
  "Mar 21",
  "Mar 22",
  "Mar 23"
];

const times = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM"
];

const initialPosts = [
  {
    id: 1,
    day: 0,
    time: 0,
    title: "Instagram Post",
    platform: "Instagram"
  },
  {
    id: 2,
    day: 1,
    time: 1,
    title: "Facebook Campaign",
    platform: "Facebook"
  },
  {
    id: 3,
    day: 2,
    time: 2,
    title: "Product Promotion",
    platform: "LinkedIn"
  },
  {
    id: 4,
    day: 3,
    time: 3,
    title: "LinkedIn Update",
    platform: "LinkedIn"
  },
  {
    id: 5,
    day: 4,
    time: 4,
    title: "YouTube Video",
    platform: "YouTube"
  },
  {
    id: 6,
    day: 5,
    time: 2,
    title: "Facebook Campaign",
    platform: "Facebook"
  }
];

const icons = {
  Instagram: "◎",
  Facebook: "f",
  LinkedIn: "in",
  YouTube: "▶"
};

function App() {
  const [posts, setPosts] = useState(initialPosts);

  const [filter, setFilter] = useState("All");

  const [optimized, setOptimized] = useState(false);

  const [renderCount, setRenderCount] = useState(0);

  const [editing, setEditing] = useState(null);

  const visiblePosts =
    filter === "All"
      ? posts
      : posts.filter((post) => post.platform === filter);

  const handleOptimized = () => {
    setOptimized(true);
    setRenderCount(1);
  };

  const handleNonOptimized = () => {
    setOptimized(false);
    setRenderCount(6);
  };

  const resetMetrics = () => {
    setOptimized(false);
    setRenderCount(0);
  };

  const movePost = (id, day, time) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              day: day,
              time: time
            }
          : post
      )
    );
  };

  const addPost = () => {
    const newPost = {
      id: Date.now(),
      day: 0,
      time: 0,
      title: "New Social Post",
      platform: "Instagram"
    };

    setPosts([...posts, newPost]);

    setEditing(newPost);
  };

  const savePost = (updatedPost) => {
    setPosts(
      posts.map((post) =>
        post.id === updatedPost.id
          ? updatedPost
          : post
      )
    );

    setEditing(null);
  };

  const deletePost = (id) => {
    setPosts(
      posts.filter((post) => post.id !== id)
    );

    setEditing(null);
  };

  return (
    <div className="app">

      <header>

        <div className="brand">

          <div className="logo">
            ▣
          </div>

          <div>
            <h1>Weekly Post Scheduler</h1>

            <p>
              Drag and drop posts to reschedule them
            </p>
          </div>

        </div>

        <div className="socials">
          <span>◎</span>
          <span>f</span>
          <span>in</span>
          <span>▶</span>
        </div>

      </header>


      <div className="controls">

        <div className="status">

          <span
            className={
              optimized
                ? "green-dot"
                : "purple-dot"
            }
          ></span>

          {optimized
            ? "Optimized"
            : "Non-Optimized"}

        </div>


        <button
          className={optimized ? "active" : ""}
          onClick={handleOptimized}
        >
          ✦ Optimized
        </button>


        <button
          className={!optimized && renderCount === 6 ? "active" : ""}
          onClick={handleNonOptimized}
        >
          ↻ Non-Optimized
        </button>


        <button
          onClick={resetMetrics}
        >
          Reset
        </button>

      </div>


      <div className="metrics">

        <div className="metric">

          <small>
            Current Mode
          </small>

          <strong>
            {renderCount === 0
              ? "Non-Optimized"
              : optimized
              ? "Optimized"
              : "Non-Optimized"}
          </strong>

        </div>


        <div className="metric">

          <small>
            Components Re-rendered
          </small>

          <strong className="green-text">
            {renderCount}
          </strong>

        </div>


        <div className="metric">

          <small>
            Optimization Time
          </small>

          <strong className="pink-text">

            {renderCount === 0
              ? "0 ms"
              : optimized
              ? "1.8s"
              : "4.2s"}

          </strong>

        </div>


        <button
          className="add-button"
          onClick={addPost}
        >
          + Add Post
        </button>

      </div>


      <div className="hint">

        ✦ Click event to view/edit
        &nbsp; • &nbsp;
        Drag event to reschedule

      </div>


      <div className="calendar">

        <div className="corner">
          Time
        </div>


        {days.map((day, index) => (

          <div
            className={`day-header day-${index}`}
            key={day}
          >

            <b>
              {day}
            </b>

            <small>
              {dates[index]}
            </small>

          </div>

        ))}


        {times.map((time, timeIndex) => (

          <div
            className="calendar-row"
            key={time}
          >

            <div className="time-cell">
              {time}
            </div>


            {days.map((_, dayIndex) => {

              const cellPosts =
                visiblePosts.filter(
                  (post) =>
                    post.day === dayIndex &&
                    post.time === timeIndex
                );


              return (

                <div
                  className="calendar-cell"
                  key={dayIndex}

                  onDragOver={(e) =>
                    e.preventDefault()
                  }

                  onDrop={(e) => {

                    const id = Number(
                      e.dataTransfer.getData(
                        "postId"
                      )
                    );

                    movePost(
                      id,
                      dayIndex,
                      timeIndex
                    );

                  }}

                >

                  {cellPosts.map((post) => (

                    <div
                      key={post.id}

                      className={`post ${post.platform.toLowerCase()}`}

                      draggable

                      onDragStart={(e) => {

                        e.dataTransfer.setData(
                          "postId",
                          post.id
                        );

                      }}

                      onClick={() =>
                        setEditing(post)
                      }

                    >

                      <div className="post-icon">

                        {icons[post.platform]}

                      </div>


                      <div className="post-info">

                        <b>
                          {post.title}
                        </b>

                        <small>
                          {post.platform} • scheduled
                        </small>

                      </div>


                      <span className="edit">
                        ✎
                      </span>

                    </div>

                  ))}

                </div>

              );

            })}

          </div>

        ))}

      </div>


      <footer>

        <span>
          Updated just now
        </span>


        <div className="filters">

          {[
            "All",
            "Instagram",
            "Facebook",
            "LinkedIn",
            "YouTube"
          ].map((item) => (

            <button
              key={item}

              className={
                filter === item
                  ? "selected"
                  : ""
              }

              onClick={() =>
                setFilter(item)
              }

            >
              {item}
            </button>

          ))}

        </div>

      </footer>


      {editing && (

        <div className="overlay">

          <div className="modal">

            <div className="modal-title">

              <h2>
                Edit Post
              </h2>

              <button
                onClick={() =>
                  setEditing(null)
                }
              >
                ×
              </button>

            </div>


            <label>

              Post Title

              <input
                value={editing.title}

                onChange={(e) =>
                  setEditing({
                    ...editing,
                    title: e.target.value
                  })
                }

              />

            </label>


            <label>

              Platform

              <select
                value={editing.platform}

                onChange={(e) =>
                  setEditing({
                    ...editing,
                    platform: e.target.value
                  })
                }

              >

                <option>
                  Instagram
                </option>

                <option>
                  Facebook
                </option>

                <option>
                  LinkedIn
                </option>

                <option>
                  YouTube
                </option>

              </select>

            </label>


            <div className="modal-row">

              <label>

                Day

                <select
                  value={editing.day}

                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      day: Number(
                        e.target.value
                      )
                    })
                  }

                >

                  {days.map((day, index) => (

                    <option
                      key={day}
                      value={index}
                    >
                      {day}
                    </option>

                  ))}

                </select>

              </label>


              <label>

                Time

                <select
                  value={editing.time}

                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      time: Number(
                        e.target.value
                      )
                    })
                  }

                >

                  {times.map((time, index) => (

                    <option
                      key={time}
                      value={index}
                    >
                      {time}
                    </option>

                  ))}

                </select>

              </label>

            </div>


            <div className="modal-buttons">

              <button
                className="delete"

                onClick={() =>
                  deletePost(editing.id)
                }

              >
                Delete
              </button>


              <span></span>


              <button
                onClick={() =>
                  setEditing(null)
                }
              >
                Cancel
              </button>


              <button
                className="save"

                onClick={() =>
                  savePost(editing)
                }

              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;