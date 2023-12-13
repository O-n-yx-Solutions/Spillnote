import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { signup, useAuth } from "../firebase.js";
import Header from "../Common/Header.jsx";
import "./styles/RegPage.css";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const navigate = useNavigate(); // Use useNavigate for navigation

    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignup() {
        setLoading(true);
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/acct_page"); // Use navigate for navigation
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    return (
        <div style={{display: "grid", gridTemplateColumns: "repeat(8, 1fr)"}}>
            <Header />
            <div className="signup-section" style={{gridColumn: "2/9"}}>
                <h1>Sign Up</h1>
                <div className="login-out-form-inputs">
                    <input ref={emailRef} type="email" name="clientEmail" id="clientEmail" placeholder="Email" required />
                    <input ref={passwordRef} type="password" name="clientPassword" id="clientPassword" placeholder="Password" required />
                </div>
                <button disabled={loading || currentUser} onClick={handleSignup}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}
