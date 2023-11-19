export default function Header()
{
    return(
        <section id="header">
            <div id="logo">
                <a><img src="/src/Components/images/logo.png" alt="Spillnote Logo"/></a>
            </div>
            <div id="account">
                <a id="myaccount-link" href="?action=acct_page">My Account</a>
                <a id="return-home" href="?action=default">Return to Home Page</a>
            </div>
        </section>
    );
}