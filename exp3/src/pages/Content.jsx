import Navbar from "../components/Navbar";

const Content = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Content</h1>

        <div className="card">
          <h2>Application Content</h2>

          <p>
            This content can be viewed by Admin, Editor and Viewer.
          </p>

          <p>
            Role-Based Access Control controls access according to
            user permissions.
          </p>
        </div>
      </div>
    </>
  );
};

export default Content;