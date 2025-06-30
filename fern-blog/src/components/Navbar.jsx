import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <nav style={navStyle}>
      <div style={leftStyle}>
        <Link to="/" style={brandStyle}> Sam's Blog Space</Link>
        {user && (
          <>
            <Link to="/create" style={navLinkStyle}> Create</Link>
            <Link to="/saved" style={navLinkStyle}> Saved</Link>
          </>
        )}
      </div>
      <div style={rightStyle}>
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>Hi, {user.displayName.split(" ")[0]}</span>
            <button onClick={logout} style={buttonStyle}>Logout</button>
          </>
        ) : (
          <button onClick={loginWithGoogle} style={buttonStyle}>Login</button>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  padding: "1rem 3rem",
  backgroundColor: "var(--primary)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
};

const leftStyle = {
  display: "flex",
  gap: "2rem",
  alignItems: "center",
};

const rightStyle = {
  display: "flex",
  gap: "1.5rem",
  alignItems: "center",
};

const brandStyle = {
  fontSize: "1.4rem",
  fontWeight: "bold",
  color: "white",
};

const navLinkStyle = {
  color: "white",
  fontSize: "1rem",
  fontWeight: 500,
  textDecoration: "none",
};

const buttonStyle = {
  backgroundColor: "white",
  color: "var(--primary)",
  border: "none",
  borderRadius: "6px",
  padding: "0.5rem 1rem",
  fontWeight: "bold",
};

export default Navbar;
