import { useAuth } from "../context/AuthContext";

function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Login to FERN Blog</h2>
      <button
        onClick={loginWithGoogle}
        style={{
          backgroundColor: "var(--primary)",
          color: "white",
          padding: "1rem 2rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
