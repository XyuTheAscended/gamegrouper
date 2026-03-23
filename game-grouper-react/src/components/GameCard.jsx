function GameCard({ title, image, description }) {
  return (
    <div className="gamebox">
      <img src={`/images/${image}`} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default GameCard;