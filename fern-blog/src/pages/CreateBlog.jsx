import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [authorName, setAuthorName] = useState("");
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authorName || !gender || !title || !content) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: new Date(),
        author: {
          uid: user.uid,
          name: authorName,
          gender: gender.toLowerCase()
        }
      });

      setTitle("");
      setContent("");
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Please log in to create a post </h2>
      </div>
    );
  }

  return (
    <div style={formWrapper}>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Your Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="female"> Female</option>
          <option value="male"> Male</option>
        </select>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Content"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

const formWrapper = {
  padding: "2rem",
  maxWidth: "600px",
  margin: "0 auto",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

export default CreateBlog;
