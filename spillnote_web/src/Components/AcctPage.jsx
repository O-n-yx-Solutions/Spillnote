import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, useAuth } from "../firebase";
import Nav from "./Nav.jsx";
import "./styles/AcctPage.css";
import Creator from "./Create.jsx";

export default function AcctPage() {
  const currentUser = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      navigate("/");
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  // Redirect to the login page if there is no current user
  if (!currentUser) {
    // alert("Something went wrong... cannot load account page");
    navigate("/login_page");
    return null; // Render nothing or a loading spinner while redirecting
  }

  return (
    <div className="acct-page-container" style={{backgroundImage: "linearGradient(rgb(0, 102, 255), rgb(212, 0, 255))"}}>
      <Nav />
      <div className="account-section">
        <h1>Account</h1>
        <div className="logged-in-info">
          <h2>Logged in as: {currentUser?.email}</h2>
          <button disabled={!currentUser} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
      <Creator />
    </div>
  );
}
