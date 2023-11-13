
export default function LoginPage()
{
    return (
        <section>
            <a href="default">Return to Choices</a>
            <h1>Log In</h1>
            <form id="login_form">
                <label htmlFor="clientUsername">Username:</label>
                <input type="email" id="clientUsername"></input>

                <label htmlFor="clientPass">Password:</label>
                <input type="password" id="clientPassword"></input>

                <input type="submit" name="submit" id="sub_btn" value="Log In"></input>
            </form>
            <p>Need an account? <a href='?action=reg_page'>Register</a></p>
        </section>
    );
}