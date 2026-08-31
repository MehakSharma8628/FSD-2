import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">

      <div>
        <h2>Post Composer</h2>

        <p>
          Welcome, <strong>{user.name}</strong>
        </p>
      </div>

      <div className="navbar-right">

        <span className="role-badge">
          {user.role}
        </span>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;