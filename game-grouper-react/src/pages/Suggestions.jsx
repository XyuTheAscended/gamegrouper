import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BrowseCard from "../components/BrowseCard.jsx";
import "../styles/suggestions.css";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null
  });

  useEffect(() => {
    fetch("https://demo-backend-1-1m09.onrender.com/api/suggestions")
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch(() => console.log("fetch failed"));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0]
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelected(null);
    setEditMode(false);
    setStatus("");
    setFormData({
      title: "",
      description: "",
      image: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (formData.title.length < 3) {
      setStatus("Title must be at least 3 characters");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const res = await fetch("https://demo-backend-1-1m09.onrender.com/api/suggestions", {
        method: "POST",
        body: data
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus(result.error || "Error");
        return;
      }

      setSuggestions((prev) => [...prev, result]);
      closePopup();
    } catch {
      setStatus("Error");
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    if (!id) {
      alert("Missing ID");
      return;
    }

    try {
      const res = await fetch(
        `https://demo-backend-1-1m09.onrender.com/api/suggestions/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      setSuggestions((prev) =>
        prev.filter((s) => s._id !== id)
      );

      closePopup();
    } catch {
      alert("Delete failed");
    }
  };

  const handleEdit = async (e) => {
    e.stopPropagation();

    if (!selected?._id) {
      alert("Missing ID");
      return;
    }

    if (selected.title.length < 3) {
      alert("Title must be at least 3 characters");
      return;
    }

    try {
      const res = await fetch(
        `https://demo-backend-1-1m09.onrender.com/api/suggestions/${selected._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: selected.title,
            description: selected.description
          })
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error();

      setSuggestions((prev) =>
        prev.map((s) => (s._id === selected._id ? data : s))
      );

      setSelected(data);
      setEditMode(false);
    } catch {
      alert("Edit failed");
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
            <li><Link to="/suggestions">Suggestions</Link></li>
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

          <div className="suggestionContainer">
            <button className="suggestionPlusBtn" onClick={() => setShowPopup(true)}>
              +
            </button>
          </div>

          <h1 id="browseTitle">SUGGESTIONS</h1>

          <section id="browseGrid">
            {suggestions.map((game) => (
              <div key={game._id} onClick={() => setSelected(game)}>
                <BrowseCard game={game} />
              </div>
            ))}
          </section>
        </main>
      </div>

      {showPopup && (
        <div className="suggestionOverlay" onClick={closePopup}>
          <div className="suggestionModal" onClick={(e) => e.stopPropagation()}>
            <div className="suggestionHeader">
              <h2>Add Suggestion</h2>
              <button className="suggestionCloseBtn" onClick={closePopup}>
                ×
              </button>
            </div>

            <form className="suggestionForm" onSubmit={handleSubmit}>
              <input
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
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
              />

              <button type="submit" className="suggestionSubmitBtn">
                Add Suggestion
              </button>
            </form>

            {status && <p className="suggestionStatus">{status}</p>}
          </div>
        </div>
      )}

      {selected && (
        <div className="suggestionOverlay" onClick={closePopup}>
          <div className="suggestionModal" onClick={(e) => e.stopPropagation()}>
            <div className="suggestionHeader">
              <h2>{editMode ? "Edit Suggestion" : "Suggestion"}</h2>
              <button className="suggestionCloseBtn" onClick={closePopup}>
                ×
              </button>
            </div>

            <img
              src={selected.image}
              alt={selected.title}
              className="suggestionImage"
            />

            {editMode ? (
              <>
                <input
                  value={selected.title}
                  onChange={(e) =>
                    setSelected({ ...selected, title: e.target.value })
                  }
                />
                <textarea
                  value={selected.description}
                  onChange={(e) =>
                    setSelected({ ...selected, description: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                <h3>{selected.title}</h3>
                <p>{selected.description}</p>
              </>
            )}

            <div className="suggestionActions">
              {editMode ? (
                <button className="saveBtn" onClick={handleEdit}>
                  Save
                </button>
              ) : (
                <button className="editBtn" onClick={() => setEditMode(true)}>
                  Edit
                </button>
              )}

              <button
                className="deleteBtn"
                onClick={(e) => handleDelete(e, selected._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Suggestions;