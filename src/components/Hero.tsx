"use client";

export default function Hero({ onRegisterClick }: { onRegisterClick: () => void }) {
  return (
    <section className="hero" id="about">
      <div className="container">
        <span className="badge">12th Week Project</span>
        <h2>Introduction to Programming</h2>
        <p>
          Explore the 20 comprehensive Python projects assigned by{" "}
          <strong>Dr. Motaz Samy</strong> & <strong>TA. Toka Sherif</strong>. Build, learn,
          and master the fundamentals of software engineering.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn primary-btn">
            Explore Projects <i className="fa-solid fa-arrow-down"></i>
          </a>
          <button onClick={onRegisterClick} className="btn secondary-btn">
            Register Team <i className="fa-solid fa-users"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
