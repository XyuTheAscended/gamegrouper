function GameCard({ title, image, description }) {
  return (
    <div className="gamebox">
      <img src={`${process.env.PUBLIC_URL}/images/${image}`} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default GameCard;