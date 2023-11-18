
import { useRef, useState } from "react";
import { login, logout, useAuth } from "../firebase";

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
        } catch {
            alert("Login Failed");
        }
        // setLoading(false);
    }

    async function handleLogout() {
        setLoading(true);
        try {
            await logout();
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }
    return (
        // <section>
        //     <a href="default">Return to Choices</a>
        //     <h1>Log In</h1>
        //     <form id="login_form">
        //         <label htmlFor="clientUsername">Username:</label>
        //         <input type="email" id="clientUsername"></input>

        //         <label htmlFor="clientPass">Password:</label>
        //         <input type="password" id="clientPassword"></input>

        //         <input type="submit" name="submit" id="sub_btn" value="Log In"></input>
        //     </form>
        //     <p>Need an account? <a href='?action=reg_page'>Register</a></p>
        // </section>
        <div>
            <div>Logged In As: {currentUser?.email}</div>
            <div>
                <input ref={emailRef} type="email" name="" id="" placeholder="Email" />
                <input ref={passwordRef} type="password" name="" id="" placeholder="Password"/>
            </div>
            <button disabled={loading || currentUser} onClick={handleLogin}>Log In</button>
            <button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</button>

        </div>
        
    );
}