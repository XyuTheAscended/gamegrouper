import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/genres.css"; // or home.css if you're reusing

function Genres() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div id="website">

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
          </ul>
        </nav>
      </header>

      {/* DESKTOP ARROW */}
      <button
        id="desktopArrow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "◄" : "►"}
      </button>

      {/* MOBILE BUTTON */}
      <button
        id="sidebarToggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? "▲ Menu" : "▼ Menu"}
      </button>

      <div id="pagelayout">

        {/* SIDEBAR */}
        <aside
          id="sidebar"
          className={`${!sidebarOpen ? "closed" : ""} ${mobileOpen ? "show" : ""}`}
        >
          <h2>POPULAR TAGS</h2>
          <ul>
            <li><Link to="/browse">Horror games</Link></li>
            <li><Link to="/browse">Multiplayer</Link></li>
            <li><Link to="/browse">Visual novels</Link></li>
            <li><Link to="/browse">Simulation</Link></li>
            <li><Link to="/browse">Roguelike</Link></li>
            <li><Link to="/genres">Browse all tags →</Link></li>
          </ul>

          <div className="sidebar-gamepad">
            <img src="/images/gamepad.png" alt="Gamepad" />
          </div>
        </aside>

        {/* MAIN */}
        <main id="maincontent">

          {/* LOGIN */}
          <div id="login">
            <Link to="/login">Login</Link> | <Link to="/login">Signup</Link>
          </div>

          {/* GENRES GRID */}
          <section id="genresGrid">

            <Link to="/browse?tag=roguelike" className="genreBox">
              <img src="/images/roguelineage.png" alt="Roguelike" />
              <h3>ROGUELIKE</h3>
            </Link>

            <Link to="/browse?tag=indie" className="genreBox">
              <img src="/images/hollowknight.png" alt="Indie" />
              <h3>INDIE</h3>
            </Link>

            <Link to="/browse?tag=horror" className="genreBox">
              <img src="/images/Horror.png" alt="Horror" />
              <h3>HORROR</h3>
            </Link>

            <Link to="/browse?tag=multiplayer" className="genreBox">
              <img src="/images/fortnite.png" alt="Multiplayer" />
              <h3>MULTIPLAYER</h3>
            </Link>

            <Link to="/browse?tag=singleplayer" className="genreBox">
              <img src="/images/godofwar.png" alt="Singleplayer" />
              <h3>SINGLEPLAYER</h3>
            </Link>

            <Link to="/browse?tag=fps" className="genreBox">
              <img src="/images/codmw.png" alt="FPS" />
              <h3>FPS</h3>
            </Link>

            <Link to="/browse?tag=rpg" className="genreBox">
              <img src="/images/minecraft.png" alt="RPG" />
              <h3>RPG</h3>
            </Link>

            <Link to="/browse?tag=3d" className="genreBox">
              <img src="/images/3D.png" alt="3D" />
              <h3>3D</h3>
            </Link>

            <Link to="/browse?tag=2d" className="genreBox">
              <img src="/images/mario.png" alt="2D" />
              <h3>2D</h3>
            </Link>

          </section>

        </main>
      </div>

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

export default Genres;