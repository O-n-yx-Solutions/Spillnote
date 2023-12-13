import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/acct_page">Account</Link>
        </div>
        <div>
          <Link to="/settings_page">Settings</Link>
        </div>
        <div>
          <Link to="/calendar">Calendar</Link>
        </div>
        <div>
          <Link to="/text_editor">Create</Link>
        </div>
        </nav>
      <Outlet />
    </>
  )
};

export default Layout;