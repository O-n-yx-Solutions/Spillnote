
export default function LoginPage()
{
    return (
        <section>
            <h1>Log In</h1>
            <form id="login_form">
                <label htmlFor="clientUsername">Username:</label>
                <input type="text" id="clientUsername"></input>

                <label htmlFor="clientPass">Password:</label>
                <input type="password" id="clientPass"></input>

                <input type="submit" name="submit" id="login_btn" value="Log In"></input>
            </form>
            <a href='/src/App.jsx?action=reg_page'>Register</a>
        </section>
    );
}