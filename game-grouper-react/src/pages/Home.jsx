import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import "../styles/home.css";

function Home() {
  const [games, setGames] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/data/games.json")
      .then((res) => res.json())
      .then((data) => {
        const featured = ["Among Us", "God of War", "Rogue Lineage"];

        const filtered = data.games.filter((game) =>
          featured.includes(game.title)
        );

        setGames(filtered);
      });
  }, []);

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

      <button id="desktopArrow" onClick={() => setSidebarOpen(!sidebarOpen)}>
  {sidebarOpen ? "◄" : "►"}
</button>

<button id="sidebarToggle" onClick={() => setMobileOpen(!mobileOpen)}>
  {mobileOpen ? "▲ Menu" : "▼ Menu"}
</button>

      <div id="pagelayout">

        {/* SIDEBAR */}
        <aside  id="sidebar"
  className={`${!sidebarOpen ? "closed" : ""} ${mobileOpen ? "show" : ""}`}>
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

          {/* VIDEO */}
          <div id="videopreview">
            <iframe
              src="https://www.youtube.com/embed/E6MDYz9YVnY"
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>

          {/* FEATURED */}
          <div id="featuredtitle">
            <h2>Latest Featured Games</h2>
            <Link id="viewAllBtn" to="/browse">View All &gt;&gt;&gt;</Link>
          </div>

          {/* 🔥 GAME GRID */}
          <section id="gameslayout">
            {games.map((game, index) => (
              <GameCard
                key={index}
                title={game.title}
                image={game.image}
                description={game.description}
              />
            ))}
          </section>

        </main>
      </div>

      {/* FOOTER */}
      <footer id="footer">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/browse">Browse</Link>
          <Link to="/deals">Deals</Link>
        </nav>
        <p>© 2026 Game Grouper</p>
      </footer>

    </div>
  );
}

export default Home;