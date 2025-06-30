import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import SaveButton from "../components/SaveButton";

function Home() {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(fetched);
    };

    const fetchSavedPosts = async () => {
      if (user) {
        const savedSnap = await getDocs(collection(db, "users", user.uid, "savedPosts"));
        const saved = savedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSavedPosts(saved);
      }
    };

    fetchPosts();
    fetchSavedPosts();
  }, [user]);

  const getAvatarUrl = (gender) => {
    return gender === "female"
      ? "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
      : "https://cdn-icons-png.flaticon.com/512/4140/4140037.png";
  };

  if (!user) {
    return (
      <div style={fullScreenWelcome}>
        <h1>Welcome to your safe space.</h1>
        <p>
          Share your thoughts. Save inspiration. Discover ideas.  
          <br />
          <strong>Login to begin your writing journey.</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginTop: "2rem" }}>Latest Posts</h2>
      <div style={tileContainerStyle}>
        {posts.map(post => (
          <div key={post.id} style={cuteTileStyle}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
              <img
                src={getAvatarUrl(post.author.gender)}
                alt="avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "0.75rem" }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{post.title}</h3>
                <p style={{ fontSize: "0.75rem", color: "#999", margin: 0 }}>By {post.author.name}</p>
              </div>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>{post.content.substring(0, 100)}...</p>
            <SaveButton post={post} />
          </div>
        ))}
      </div>

      {savedPosts.length > 0 && (
        <>
          <h2 style={{ marginTop: "3rem" }}>Your Saved Blogs</h2>
          <div style={tileContainerStyle}>
            {savedPosts.map(post => (
              <div key={post.id} style={tileStyle}>
                <h4>{post.title}</h4>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>{post.content.substring(0, 80)}...</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// 🎨 Styles
const fullScreenWelcome = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "2rem",
  backgroundColor: "#f8f4fc",
  color: "#333",
  fontFamily: "sans-serif",
};

const tileContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "1.5rem",
  marginTop: "1rem",
};

const cuteTileStyle = {
  backgroundColor: "#f3e5f5",
  borderRadius: "20px",
  padding: "1.5rem",
  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.2s ease",
};

const tileStyle = {
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: "1rem",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
};

export default Home;
