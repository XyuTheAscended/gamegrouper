import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/about.css";

function About() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    setStatus("Sending...");

    try {
      await fetch(
        "https://formsubmit.co/ajax/tyler.christian.norman@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      setStatus("Message sent successfully!");
      form.reset();
    } catch (error) {
      setStatus("Error sending message.");
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
            <li><Link to="/suggestions">Suggestions</Link></li>
          </ul>
        </nav>
      </header>

      <div id="pagelayout">

        <main id="maincontent">

          {/* LOGIN */}
          <div id="login">
            <Link to="/login">Login</Link> | <Link to="/login">Signup</Link>
          </div>

          {/* HERO */}
          <section className="about-hero">
            <h2>About Game Grouper</h2>
            <p>
              Game Grouper is a website ran by one person named Tyler Norman.
              This website is something I thought would be cool to make considering
              that I like websites with game and information on games. I hope this
              website can become enjoyable to you and take care!
            </p>
          </section>

          {/* GRID */}
          <section className="about-grid">

            <div className="about-box">
              <h3>My Mission</h3>
              <img src={`${process.env.PUBLIC_URL}/images/gamer.png`} alt="Mission" />
              <p>
                My mission for this website is to ensure that the user is pleased
                with the products and material on the website for videogames.
              </p>
            </div>

            <div className="about-box">
              <h3>What I Offer</h3>
              <img src={`${process.env.PUBLIC_URL}/images/gamer2.png`} alt="Offer" />
              <p>
                I offer many games ranging from different categories that I know
                people would enjoy.
              </p>
            </div>

            <div className="about-box">
              <h3>My Community</h3>
              <img src={`${process.env.PUBLIC_URL}/images/gamer3.png`} alt="Community" />
              <p>
                Join my community and stay updated on new games and sales!
              </p>
            </div>

          </section>

          {/* CONTACT */}
          <section id="contactSection">

            <h2>Contact Me</h2>

            <div className="contact-container">

              {/* FORM */}
              <form id="contactForm" onSubmit={handleSubmit}>

                <input type="text" name="name" placeholder="Your Name" required />

                <input type="email" name="email" placeholder="Your Email" required />

                <textarea name="message" placeholder="Your Message" required />

                {/* REQUIRED HIDDEN FIELDS */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New Game Grouper Message" />

                <button type="submit">Send Message</button>

              </form>

              {/* RIGHT SIDE */}
              <div className="contact-side">
                <h3>Get In Touch</h3>
                <p>
                  If you have any questions, feedback, or game suggestions,
                  feel free to reach out!
                </p>

                {/* 🔥 STATUS MESSAGE */}
                {status && <p className="status">{status}</p>}
              </div>

            </div>

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

export default About;