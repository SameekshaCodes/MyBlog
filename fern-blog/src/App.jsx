import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateBlog from "./pages/CreateBlog";
import SavedPosts from "./pages/SavedPosts";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/saved" element={<SavedPosts />} />
      </Routes>
    </Router>
  );
}

export default App;

