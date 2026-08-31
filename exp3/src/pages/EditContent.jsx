import Navbar from "../components/Navbar";

const EditContent = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Edit Content</h1>

        <div className="card">
          <textarea
            rows="8"
            placeholder="Write or edit content here..."
          ></textarea>

          <br />

          <button>Save Changes</button>
        </div>
      </div>
    </>
  );
};

export default EditContent;