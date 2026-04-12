import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BrowseCard from "../components/BrowseCard.jsx";
import "../styles/browse.css";

function Browse() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    tags: "",
    image: ""
  });

  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag") || "all";

  useEffect(() => {
    fetch("http://localhost:3001/api/games")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch games");
        }
        return res.json();
      })
      .then((data) => {
        setGames(data);
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, []);

  useEffect(() => {
    if (!games.length) return;

    if (tag === "all") {
      setFilteredGames(games.slice(0, 9));
      return;
    }

    const filtered = games.filter(
      (game) => game.tags && game.tags.includes(tag)
    );

    setFilteredGames(filtered);
  }, [tag, games]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const closePopup = () => {
    setShowPopup(false);
    setStatus("");
    setFormData({
      title: "",
      description: "",
      price: "",
      tags: "",
      image: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: formData.price.trim(),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
      image: formData.image.trim()
    };

    if (
      !payload.title ||
      !payload.description ||
      !payload.price ||
      !payload.image ||
      payload.tags.length === 0
    ) {
      setStatus("Please fill out all fields correctly.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus(result.error || "Failed to send suggestion.");
        return;
      }

      setStatus("Suggestion sent successfully!");

      setFormData({
        title: "",
        description: "",
        price: "",
        tags: "",
        image: ""
      });
    } catch (error) {
      setStatus("Error sending suggestion.");
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
          <div classname="suggestionContainer">
        <button className="suggestionPlusBtn" onClick={() => setShowPopup(true)}>
          +
        </button>
        </div>
          <h1 id="browseTitle">
            {tag === "all" ? "BROWSE GAMES" : tag.toUpperCase()}
          </h1>

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

      

      {showPopup && (
        <div className="suggestionOverlay" onClick={closePopup}>
          <div
            className="suggestionModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="suggestionHeader">
              <h2>Add Suggestion</h2>
              <button className="suggestionCloseBtn" onClick={closePopup}>
                ×
              </button>
            </div>

            <form className="suggestionForm" onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Game Name"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="image"
                placeholder="Image file name (example: hades.png)"
                value={formData.image}
                onChange={handleChange}
                required
              />

              <button type="submit" className="suggestionSubmitBtn">
                Send Suggestion
              </button>
            </form>

            {status && <p className="suggestionStatus">{status}</p>}
          </div>
        </div>
      )}

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