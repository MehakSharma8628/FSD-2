import Navbar from "../components/Navbar";

const Unauthorized = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card unauthorized">
          <h1>🚫 Access Denied</h1>

          <p>
            You do not have permission to access this page.
          </p>

          <p>
            Please contact the administrator for access.
          </p>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
