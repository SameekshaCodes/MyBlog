import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function SaveButton({ post }) {
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) return alert("Login to save posts!");
    const ref = doc(db, "users", user.uid, "savedPosts", post.id);
    await setDoc(ref, post);
    alert("Post saved!");
  };

  return (
    <button onClick={handleSave} style={saveBtnStyle}>Save</button>
  );
}

const saveBtnStyle = {
  backgroundColor: "var(--accent)",
  border: "none",
  color: "white",
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "0.5rem",
};

export default SaveButton;
