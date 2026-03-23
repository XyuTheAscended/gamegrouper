function DevlogCard({ devlog }) {
  return (
    <div className="devlogBox">
      <a href={devlog.link} target="_blank" rel="noreferrer">
        <img src={`${process.env.PUBLIC_URL}/images/${devlog.image}`} alt={devlog.title} />
      </a>
      <h3>{devlog.title}</h3>
      <p>{devlog.company}</p>
      <p>{devlog.description}</p>
    </div>
  );
}

export default DevlogCard;