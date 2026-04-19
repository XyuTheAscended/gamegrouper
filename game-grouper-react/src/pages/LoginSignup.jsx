import { Link } from "react-router-dom";
import "../styles/login.css";

function Login() {

  // prevent page refresh (React behavior)
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>

      {/* HEADER */}
      <header id="topbar">
        <h1>
          <Link id="HomeT" to="/">Game Grouper</Link>
        </h1>

        <nav id="topnav">
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/genres">Genres</Link></li>
            <li><Link to="/deals">Deals</Link></li>
            <li><Link to="/browse">Browse Games</Link></li>
            <li><Link to="/devlogs">Developer Logs</Link></li>
            <li><Link to="/suggestions">Suggestions</Link></li>
          </ul>
        </nav>
      </header>

      {/* MAIN */}
      <main id="authPage">

        {/* LOGIN */}
        <section className="authColumn">

          <h2>LOGIN</h2>

          <form className="authForm" onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text" placeholder="Enter username" />

            <label>Password:</label>
            <input type="password" placeholder="Enter password" />

            <button type="submit">Login</button>
          </form>

        </section>

        {/* DIVIDER */}
        <div id="divider"></div>

        {/* SIGNUP */}
        <section className="authColumn">

          <h2>SIGNUP</h2>

          <form className="authForm" onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text" placeholder="Choose username" />

            <label>Password:</label>
            <input type="password" placeholder="Choose password" />

            <button type="submit">Sign Up</button>
          </form>

        </section>

      </main>

      {/* FOOTER */}
      <footer id="footer">
        <nav>
          <Link to="/">Home</Link>{" "}
          <Link to="/about">About</Link>{" "}
          <Link to="/browse">Browse</Link>{" "}
          <Link to="/deals">Deals</Link>
        </nav>

        <p>© 2026 Game Grouper</p>
      </footer>

    </div>
  );
}

export default Login;