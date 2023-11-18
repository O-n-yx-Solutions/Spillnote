import { useRef, useState } from "react";
import { signup, login, logout, useAuth } from "../firebase";

export default function RegisterPage()
{
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignup() {
        
        setLoading(true);
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    async function handleLogin(){
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("Login Failed");
        }
        setLoading(false);
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
    // return (
    //     <section>
    //         <a href="default">Return to Choices</a>
    //         <h1>Register</h1>
    //         <form id="reg_form">
    //             <label htmlFor="clientFirstname">First Name:</label>
    //             <input type="text" id="clientFirstname"></input>
    
    //             <label htmlFor="clientLastname">Last Name:</label>
    //             <input type="text" id="clientLastname"></input>

    //             <label htmlFor="clientEmail">Email:</label>
    //             <input type="email" id="clientEmail"></input>
    
    //             <label htmlFor="clientPassword">Password:</label>
    //             <input type="password" id="clientPassword"></input>
    
    //             <input type="submit" name="submit" id="sub_btn" value="Sign Up"></input>
    //             <input type="hidden" name="action" value="reg_user"></input>
    //         </form>
    //         <p>Already have an account? <a href="?action=login_page">Log In</a></p>
    //     </section>
    //     );
    return (
        <div>
            <div> Signed Up As: {currentUser?.email} </div>
            <div>
                <input ref={emailRef} type="email" name="" id="" placeholder="Email"/>
                <input ref={passwordRef} type="password" name="" id="" placeholder="Password"/>
            </div>

            <button disabled={loading || currentUser} onClick={handleSignup}>Sign Up</button>
            <button disabled={loading || currentUser} onClick={handleLogin}>Log In</button>
            <button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</button>
        </div>
    );
}
