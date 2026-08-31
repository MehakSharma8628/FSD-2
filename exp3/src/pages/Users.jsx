import Navbar from "../components/Navbar";

const Users = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>User Management</h1>

        <div className="card">
          <h2>Registered Users</h2>

          <ul>
            <li>Admin User</li>
            <li>Editor User</li>
            <li>Viewer User</li>
          </ul>

          <button>Add User</button>
          <button>Delete User</button>
        </div>
      </div>
    </>
  );
};

export default Users;