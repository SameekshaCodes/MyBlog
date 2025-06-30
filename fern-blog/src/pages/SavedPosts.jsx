// src/pages/SavedPosts.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function SavedPosts() {
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      if (user) {
        const snap = await getDocs(collection(db, "users", user.uid, "savedPosts"));
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSaved(data);
      }
    };
    fetchSaved();
  }, [user]);

  if (!user) {
    return (
      <div className="container">
        <h2>Saved Blogs</h2>
        <p>Please log in to view your saved posts.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Your Saved Blogs</h2>
      {saved.length === 0 ? (
        <p>You haven’t saved any blogs yet.</p>
      ) : (
        <div style={gridStyle}>
          {saved.map(post => (
            <div key={post.id} style={cardStyle}>
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <p style={{ fontSize: "0.85rem", color: "#555" }}>By {post.author.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "1.5rem",
  marginTop: "2rem",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "1rem",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

export default SavedPosts;
