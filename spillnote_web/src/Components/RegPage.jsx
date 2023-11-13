export default function RegisterPage()
{
    return (
        <section>
            <a href="default">Return to Choices</a>
            <h1>Register</h1>
            <form id="reg_form">
                <label htmlFor="clientFirstname">First Name:</label>
                <input type="text" id="clientFirstname"></input>
    
                <label htmlFor="clientLastname">Last Name:</label>
                <input type="text" id="clientLastname"></input>

                <label htmlFor="clientEmail">Email:</label>
                <input type="email" id="clientEmail"></input>
    
                <label htmlFor="clientPassword">Password:</label>
                <input type="password" id="clientPassword"></input>
    
                <input type="submit" name="submit" id="sub_btn" value="Sign Up"></input>
                <input type="hidden" name="action" value="reg_user"></input>
            </form>
            <p>Already have an account? <a href="?action=login_page">Log In</a></p>
        </section>
        );
}
