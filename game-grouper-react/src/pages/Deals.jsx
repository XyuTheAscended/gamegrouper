import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/deals.css";

function Deals() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/data/games.json")
      .then(res => res.json())
      .then(data => setGames(data.games))
      .catch(err => console.error("JSON ERROR:", err));
  }, []);

  // FILTERS
  const freeGames = games.filter(g =>
    ["Minecraft", "Among Us", "Fortnite", "Apex Legends", "Valorant", "Counter-Strike 2"]
      .includes(g.title)
  );

  const fiveDollarGames = games.filter(g =>
    ["Stardew Valley", "Undertale", "Terraria", "Cuphead"]
      .includes(g.title)
  );

  const fifteenDollarGames = games.filter(g =>
    ["Hollow Knight", "Celeste", "Dead Cells", "Hades"]
      .includes(g.title)
  );

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

          {/* ===== FREE ===== */}
          <h2 className="dealCategory">FREE!</h2>
          <section className="dealsGrid">
            {freeGames.map(game => (
              <div className="dealBox" key={game.title}>
                <a href={game.link} target="_blank" rel="noreferrer">
                  <img src={`/images/${game.image}`} alt={game.title} />
                </a>
                <h3>{game.title}</h3>
                <p>FREE</p>
              </div>
            ))}
          </section>

          {/* ===== $5 ===== */}
          <h2 className="dealCategory">$5 or Less</h2>
          <section className="dealsGrid">
            {fiveDollarGames.map(game => (
              <div className="dealBox" key={game.title}>
                <a href={game.link} target="_blank" rel="noreferrer">
                  <img src={`/images/${game.image}`} alt={game.title} />
                </a>
                <h3>{game.title}</h3>
                <p>$5 or Less</p>
              </div>
            ))}
          </section>

          {/* ===== $15 ===== */}
          <h2 className="dealCategory">$15 or Less</h2>
          <section className="dealsGrid">
            {fifteenDollarGames.map(game => (
              <div className="dealBox" key={game.title}>
                <a href={game.link} target="_blank" rel="noreferrer">
                  <img src={`/images/${game.image}`} alt={game.title} />
                </a>
                <h3>{game.title}</h3>
                <p>$15 or Less</p>
              </div>
            ))}
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

export default Deals;