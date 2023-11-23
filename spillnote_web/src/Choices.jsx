import "./App.css";
import Header from "./Common/Header.jsx";

export default function Choices() {
  return (
    <div className="choices">
      <Header />
      <h1>Pick a card, any card...</h1>
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
