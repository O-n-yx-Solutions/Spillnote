import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, useAuth } from "../firebase";
import Header from "../Common/Header.jsx";
import "./styles/AcctPage.css";

export default function AcctPage() {
  const currentUser = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      navigate("/?action=default");
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  // Redirect to the login page if there is no current user
  if (!currentUser) {
    // alert("Something went wrong... cannot load account page");
    navigate("/");
    return null; // Render nothing or a loading spinner while redirecting
  }

  return (
    <div className="acct-page-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="account-section">
        <h1>Account</h1>
        <div className="logged-in-info">
          <h2>Logged in as: {currentUser?.email}</h2>
          <button disabled={!currentUser} onClick={handleLogout}>
            Log Out
          </button>
        </div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
