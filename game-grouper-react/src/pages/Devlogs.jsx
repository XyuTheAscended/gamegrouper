import { Link } from "react-router-dom";
import { useState } from "react";
import DevlogCard from "../components/DevlogCard";
import "../styles/devlogs.css";

function Devlogs() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

 const devlogs = [
  {
    title: "Minecraft 1.21 Update",
    company: "Mojang Studios",
    description: "New mobs, blocks, and exploration features added.",
    image: "minecraft.png",
    link: "https://www.minecraft.net/en-us/article/minecraft-1-21-update"
  },
  {
    title: "Elden Ring DLC",
    company: "FromSoftware",
    description: "New bosses and regions.",
    image: "eldenring.png",
    link: "https://en.bandainamcoent.eu/elden-ring"
  },
  {
    title: "Valorant Update",
    company: "Riot Games",
    description: "New agent + balance updates.",
    image: "valorant.png",
    link: "https://playvalorant.com/en-us/news/"
  },
  {
    title: "Stardew Valley 1.6",
    company: "ConcernedApe",
    description: "New content + fixes.",
    image: "stardew.png",
    link: "https://www.stardewvalley.net/"
  }
];

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
            <img src={`${process.env.PUBLIC_URL}/images/gamepad.png`} />
          </div>
        </aside>

        {/* MAIN */}
        <main id="maincontent">

          <div id="login">
            <Link to="/login">Login</Link> | <Link to="/login">Signup</Link>
          </div>

          <h1 id="devlogsTitle">DEVLOGS</h1>

          <section id="devlogsGrid">
            {devlogs.map((log, index) => (
              <DevlogCard key={index} devlog={log} />
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

export default Devlogs;