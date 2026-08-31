import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const users = [
  {
    username: "admin",
    password: "admin123",
    name: "Administrator",
    role: "Admin",
  },
  {
    username: "editor",
    password: "editor123",
    name: "Editor",
    role: "Editor",
  },
  {
    username: "viewer",
    password: "viewer123",
    name: "Viewer",
    role: "Viewer",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const foundUser = users.find(
      (item) =>
        item.username === username.trim() &&
        item.password === password
    );

    if (foundUser) {
      const loggedInUser = {
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role,
      };

      setUser(loggedInUser);

      localStorage.setItem(
        "rbacUser",
        JSON.stringify(loggedInUser)
      );

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rbacUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};