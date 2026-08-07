import "./App.css";

import StatsCards from "./Components/StatsCards";
import PostForm from "./Components/PostForm";
import PostList from "./Components/PostList";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>🚀 SocialSync Dashboard</h1>
        <p>Redux Toolkit Social Media Manager</p>
      </header>

      <StatsCards />

      <PostForm />

      <PostList />
    </div>
  );
}

export default App;