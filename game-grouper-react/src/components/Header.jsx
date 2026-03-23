import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Game Grouper</h1>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/genres">Genres</Link></li>
          <li><Link to="/deals">Deals</Link></li>
          <li><Link to="/browse">Browse</Link></li>
          <li><Link to="/devlogs">Devlogs</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;