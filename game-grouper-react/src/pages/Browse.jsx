import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BrowseCard from "../components/BrowseCard.jsx";
import "../styles/browse.css";

function Browse() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag") || "all";

  // FETCH JSON
  useEffect(() => {
    fetch("/data/games.json")
      .then(res => res.json())
      .then(data => {
        setGames(data.games);
      });
  }, []);

  // FILTER WHEN TAG OR DATA CHANGES
  useEffect(() => {
    if (!games.length) return;

    if (tag === "all") {
      setFilteredGames(games.slice(0, 9));
      return;
    }

    const filtered = games.filter(game =>
      game.tags && game.tags.includes(tag)
    );

    setFilteredGames(filtered);
  }, [tag, games]);

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

      {/* SIDEBAR BUTTONS */}
      <button id="desktopArrow" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? "◄" : "►"}
      </button>

      <button id="sidebarToggle" onClick={() => setMobileOpen(!mobileOpen)}>
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
            <li><Link to="/browse?tag=horror">Horror games</Link></li>
            <li><Link to="/browse?tag=multiplayer">Multiplayer</Link></li>
            <li><Link to="/browse?tag=visual">Visual novels</Link></li>
            <li><Link to="/browse?tag=simulation">Simulation</Link></li>
            <li><Link to="/browse?tag=roguelike">Roguelike</Link></li>
            <li><Link to="/genres">Browse all tags →</Link></li>
          </ul>

          <div className="sidebar-gamepad">
            <img src="/images/gamepad.png" alt="Gamepad" />
          </div>
        </aside>

        {/* MAIN */}
        <main id="maincontent">

          <div id="login">
            <Link to="/login">Login</Link> | <Link to="/login">Signup</Link>
          </div>

          {/* TITLE */}
          <h1 id="browseTitle">
            {tag === "all" ? "BROWSE GAMES" : tag.toUpperCase()}
          </h1>

          {/* GRID */}
          <section id="browseGrid">
            {filteredGames.length ? (
              filteredGames.map((game, index) => (
                <BrowseCard key={index} game={game} />
              ))
            ) : (
              <p>No games found.</p>
            )}
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

export default Browse;