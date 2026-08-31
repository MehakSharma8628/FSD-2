import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import { AuthProvider } from "./context/AuthContext";

import "./App.css";

function App() {
  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="*"
            element={
              <Navigate to="/" />
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;