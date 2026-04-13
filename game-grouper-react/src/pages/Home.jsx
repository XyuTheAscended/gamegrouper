import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/home.css";
import BrowseCard from "../components/BrowseCard";

function Home() {
  const [allGames, setAllGames] = useState([]);
  const [gameGroups, setGameGroups] = useState([]);
  const [groupIndex, setGroupIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("https://demo-backend-1-ln09.onrender.com/api/games")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch games");
        }
        return res.json();
      })
      .then((data) => {
        setAllGames(data);

        const featured = ["Among Us", "God of War", "Rogue Lineage"];
        const firstGroup = data.filter((game) => featured.includes(game.title));

        setGameGroups([firstGroup]);
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, []);

  const getRandomGroup = () => {
    if (allGames.length <= 3) return allGames;

    const shuffled = [...allGames].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  const nextGroup = () => {
    if (groupIndex < gameGroups.length - 1) {
      setGroupIndex(groupIndex + 1);
      return;
    }

    const newGroup = getRandomGroup();
    setGameGroups((prev) => [...prev, newGroup]);
    setGroupIndex((prev) => prev + 1);
  };

  const prevGroup = () => {
    if (groupIndex > 0) {
      setGroupIndex((prev) => prev - 1);
    }
  };

  return (
    <div id="website">
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
            <img src={`${process.env.PUBLIC_URL}/images/gamepad.png`} alt="Gamepad" />
          </div>
        </aside>

        <main id="maincontent">
          <div id="login">
            <Link to="/login">Login</Link> | <Link to="/login">Signup</Link>
          </div>

          <div id="videopreview">
            <iframe
              src="https://www.youtube.com/embed/E6MDYz9YVnY"
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>

          <div id="featuredtitle">
            <h2>Latest Featured Games</h2>
            <Link id="viewAllBtn" to="/browse">View All &gt;&gt;&gt;</Link>
          </div>

          <section id="gameslider">
            <button
              className="slider-arrow left"
              onClick={prevGroup}
              disabled={groupIndex === 0}
            >
              ◄
            </button>

            <div className="slider-games">
              {gameGroups[groupIndex] &&
                gameGroups[groupIndex].map((game, index) => (
                  <BrowseCard
                    key={`${groupIndex}-${index}-${game.title}`}
                    game={game}
                  />
                ))}
            </div>

            <button className="slider-arrow right" onClick={nextGroup}>
              ►
            </button>
          </section>
        </main>
      </div>

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