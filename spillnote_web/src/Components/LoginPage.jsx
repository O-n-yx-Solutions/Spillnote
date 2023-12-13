import { useRef, useState } from "react";
import { login, useAuth } from "../firebase";
import Nav from "./Nav.jsx";
import { Link, useNavigate } from "react-router-dom";
import './styles/RegPage.css';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/acct_page"); // Use navigate to redirect
    } catch {
      alert("Login Failed");
    }
    setLoading(false);
  }

  return (
    <div className="signup-section" style={{display: "grid", gridTemplateColumns: "repeat(8, 1fr)"}}>
      <Nav />
      <div className="login-out-form-inputs" style={{gridColumn: "2/9"}}>
        <h2>Login</h2>
        <input
          ref={emailRef}
          type="email"
          name="clientEmail"
          id="clientEmail"
          placeholder="Email"
        />
        <input
          ref={passwordRef}
          type="password"
          name="clientPassword"
          id="clientPassword"
          placeholder="Password"
        />
        <button disabled={loading || currentUser} onClick={handleLogin}>
          Log In
        </button>
        <p>
          Don't have an account? <Link to="/reg_page">Register</Link>
        </p>
      </div>
    </div>
  );
}
