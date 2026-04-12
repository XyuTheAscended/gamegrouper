import { useEffect, useState } from "react";
import "../styles/slider.css";

function GameSlider() {
  const [games, setGames] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState("");

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

        const first = data[Math.floor(Math.random() * data.length)];
        setHistory(first ? [first] : []);
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, []);

  const nextGame = () => {
    if (games.length === 0) return;

    const random = games[Math.floor(Math.random() * games.length)];

    setAnimate("slide-right");

    setTimeout(() => {
      const newHistory = [...history.slice(0, currentIndex + 1), random];
      setHistory(newHistory);
      setCurrentIndex(currentIndex + 1);
      setAnimate("");
    }, 300);
  };

  const prevGame = () => {
    if (currentIndex === 0) return;

    setAnimate("slide-left");

    setTimeout(() => {
      setCurrentIndex(currentIndex - 1);
      setAnimate("");
    }, 300);
  };

  const currentGame = history[currentIndex];

  return (
    <div className="slider-container">
      <button
        className="arrow left"
        onClick={prevGame}
        disabled={currentIndex === 0}
      >
        ◀
      </button>

      <div className={`game-card ${animate}`}>
        {currentGame && (
          <>
            <img
              src={`${process.env.PUBLIC_URL}/images/${currentGame.image}`}
              alt={currentGame.title}
            />
            <h2>{currentGame.title}</h2>
          </>
        )}
      </div>

      <button className="arrow right" onClick={nextGame}>
        ▶
      </button>
    </div>
  );
}

export default GameSlider;