import "./App.css";

export default function Choices() {
  return (
    <div className="choices">
      <h1>Options</h1>
      <a href="?action=login_page">Login Page</a>
      <a href="?action=reg_page">Register Page</a>
      <a href="?action=settings_page">Settings Page</a>
      <form>
        <input
          type="submit"
          name="submit"
          class="subBtn"
          value="Go to Explore"
        />
        <input type="hidden" name="action" value="explore_link" />
      </form>
    </div>
  );
}
