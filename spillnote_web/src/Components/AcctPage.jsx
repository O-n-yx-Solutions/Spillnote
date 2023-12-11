import { useRef, useState } from "react";
import { login, logout, useAuth } from "../firebase";
import Header from "../Common/Header.jsx";

export default function acctPage()
{
    const currentUser = useAuth();
    
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);
        try {
            await logout();
            window.location.replace("?action=default");
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    if(currentUser === null)
    {
        window.location.replace("?action=login_page")
    }

    return(    
        <div className="acct_page">
            <Header />
            <section id="account-info">
                <h1>Account</h1>
                <h2>Logged in as: {currentUser?.email}</h2>
                <button disabled={!currentUser} onClick={handleLogout}>Log Out</button>
            </section>
        </div>
    );
}