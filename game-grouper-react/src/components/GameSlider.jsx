import { useEffect, useState } from "react";
import "../styles/slider.css";

function GameSlider() {
  const [games, setGames] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/data/games.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games);

        // start with a random game
        const first = data.games[Math.floor(Math.random() * data.games.length)];
        setHistory([first]);
      });
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

      {/* LEFT ARROW */}
      <button
        className="arrow left"
        onClick={prevGame}
        disabled={currentIndex === 0}
      >
        ◀
      </button>

      {/* GAME DISPLAY */}
      <div className={`game-card ${animate}`}>
        {currentGame && (
          <>
            <img src={currentGame.image} alt={currentGame.title} />
            <h2>{currentGame.title}</h2>
          </>
        )}
      </div>

      {/* RIGHT ARROW */}
      <button className="arrow right" onClick={nextGame}>
        ▶
      </button>
    </div>
  );
}

export default GameSlider;