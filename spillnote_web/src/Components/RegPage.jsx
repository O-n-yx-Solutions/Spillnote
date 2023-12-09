import { useRef, useState } from "react";
import { signup, login, logout, useAuth } from "../firebase.js";
import Header from "../Common/Header.jsx";
import "./styles/RegPage.css"

export default function RegisterPage()
{
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const fnameRef = useRef();
    const lnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignup() {
        
        setLoading(true);
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            window.location.replace("?action=acct_page");
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    return (
        <div className="login-out-form">
            <Header />
        <div className="signup-section">
            <h1>Sign Up</h1>
            <div className="login-out-form-inputs">
                <input ref={emailRef} type="email" name="clientEmail" id="clientEmail" placeholder="Email" required/>
                <input ref={passwordRef} type="password" name="clientPassword" id="clientPassword" placeholder="Password" required/>
            </div>
            <button disabled={loading || currentUser} onClick={handleSignup}>Sign Up</button>
        </div>
            
        </div>
    );
}
