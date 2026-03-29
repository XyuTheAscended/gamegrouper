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
    fetch(process.env.PUBLIC_URL + "/data/games.json")
      .then((res) => res.json())
      .then((data) => {
        const gamesData = data.games || [];
        setAllGames(gamesData);

        const featured = ["Among Us", "God of War", "Rogue Lineage"];

        const firstGroup = gamesData.filter((game) =>
          featured.includes(game.title)
        );

        setGameGroups([firstGroup]);
      });
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

      {/* SIDEBAR TOGGLES */}
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
            <li><Link to="/browse">Horror games</Link></li>
            <li><Link to="/browse">Multiplayer</Link></li>
            <li><Link to="/browse">Visual novels</Link></li>
            <li><Link to="/browse">Simulation</Link></li>
            <li><Link to="/browse">Roguelike</Link></li>
            <li><Link to="/genres">Browse all tags →</Link></li>
          </ul>

          <div className="sidebar-gamepad">
            <img src={`${process.env.PUBLIC_URL}/images/gamepad.png`} alt="Gamepad" />
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

          {/* FEATURED TITLE */}
          <div id="featuredtitle">
            <h2>Latest Featured Games</h2>
            <Link id="viewAllBtn" to="/browse">View All &gt;&gt;&gt;</Link>
          </div>

          {/* GAME SLIDER */}
          <section id="gameslider">

            {/* LEFT */}
            <button
              className="slider-arrow left"
              onClick={prevGroup}
              disabled={groupIndex === 0}
            >
              ◄
            </button>

            {/* GAMES */}
            <div className="slider-games">
              {gameGroups[groupIndex] &&
                gameGroups[groupIndex].map((game, index) => (
                  <BrowseCard
                    key={`${groupIndex}-${index}-${game.title}`}
                    game={game}
                  />
                ))}
            </div>

            {/* RIGHT */}
            <button
              className="slider-arrow right"
              onClick={nextGroup}
            >
              ►
            </button>

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