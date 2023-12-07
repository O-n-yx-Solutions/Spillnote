
import { useRef, useState } from "react";
import { login, logout, useAuth } from "../firebase";
import Header from "../Common/Header.jsx";

export default function LoginPage()
{
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleLogin(){
        // setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            window.location.replace("?action=acct_page");
        } catch {
            alert("Login Failed");
        }
        // setLoading(false);
    }

    // async function handleLogout() {
    //     setLoading(true);
    //     try {
    //         await logout();
    //     } catch {
    //         alert("Error!");
    //     }
    //     setLoading(false);
    // }
    return (
        <div className="login-out-form">
            <Header />
            
            <div className="login-out-form-inputs">
                <h2>Login</h2>
                <input ref={emailRef} type="email" name="clientEmail" id="clientEmail" placeholder="Email" />
                <input ref={passwordRef} type="password" name="clientPassword" id="clientPassword" placeholder="Password"/>
                <button disabled={loading || currentUser} onClick={handleLogin}>Log In</button>
            </div>
            

        </div>
        
    );
}