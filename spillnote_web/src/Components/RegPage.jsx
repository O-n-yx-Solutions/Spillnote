export default function RegisterPage()
{
    return (
        <section>
            <h1>Register</h1>
            <form id="reg_form">
                <label htmlFor="clientFirstname">First Name:</label>
                <input type="text" id="clientFirstname"></input>
    
                <label htmlFor="clientLastname">Last Name:</label>
                <input type="password" id="clientPass"></input>

                <label htmlFor="clientEmail">Email:</label>
                <input type="text" id="clientEmail"></input>
    
                <label htmlFor="clientPass">Password:</label>
                <input type="password" id="clientPass"></input>
    
                <input type="submit" name="submit" id="reg_btn" value="Sign Up"></input>
            </form>
            <a href="/spillnote/spillnote_web/src/App.jsx?action=login_page">Register</a>
        </section>
        );
}
