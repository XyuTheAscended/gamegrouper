function BrowseCard({ game }) {
  return (
    <div className="browseBox">
      <a href={game.link || "#"} target="_blank" rel="noreferrer">
        <img src={`/images/${game.image}`} alt={game.title} />
      </a>
      <h3>{game.title}</h3>
      <p>{game.description}</p>
    </div>
  );
}

export default BrowseCard;