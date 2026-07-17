import "./About.css";

export default function About({ onBackToHome }) {
  return (
    <div className="bf-about-container">
      <nav className="bf-about-nav">
        <div className="bf-about-logo" onClick={onBackToHome}>
          BuildFlow
        </div>
        <div className="bf-about-nav-links">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBackToHome();
            }}
          >
            Home
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </nav>

      <div className="bf-about-content">
        <h1 className="bf-about-title">About BuildFlow</h1>
        <p className="bf-about-subtitle">
          BuildFlow is an AI-powered Software Architecture Designer built to translate concepts
          into structural system layouts and functional boilerplate blueprints in seconds.
        </p>

        <div className="bf-about-grid">
          <div className="bf-about-card">
            <div className="bf-ac-icon">🗺</div>
            <h3>Intelligent Layouts</h3>
            <p>
              Automated Left-to-Right architectural layouts using Dagre, helping engineers visualize data
              flows cleanly.
            </p>
          </div>

          <div className="bf-about-card">
            <div className="bf-ac-icon">📂</div>
            <h3>Folder Blueprints</h3>
            <p>
              Instantly generates recursive workspace folders tailored to the components' technologies.
            </p>
          </div>

          <div className="bf-about-card">
            <div className="bf-ac-icon">💻</div>
            <h3>Code Generation</h3>
            <p>
              Generates core starter code templates powered by Gemini 2.5 Flash, accelerating your development speed.
            </p>
          </div>

          <div className="bf-about-card">
            <div className="bf-ac-icon">⚡</div>
            <h3>Silent Resilience</h3>
            <p>
              Equipped with a silent auto-retry architecture that handles API token and quota limits seamlessly in the background.
            </p>
          </div>
        </div>

        <div className="bf-about-action">
          <button className="bf-btn-start" onClick={onBackToHome}>
            Start Designing
          </button>
        </div>
      </div>
    </div>
  );
}
