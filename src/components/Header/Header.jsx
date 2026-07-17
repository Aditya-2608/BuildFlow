import "./Header.css";

export default function Header({ onAboutClick }) {
  return (
    <div className="bf-landing-hero-container">
      <nav className="bf-landing-nav">
        <div className="bf-landing-logo">BuildFlow</div>
        <div className="bf-landing-nav-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onAboutClick();
            }}
          >
            About
          </a>
        </div>
      </nav>

      <div className="bf-landing-hero">
        <h1 className="bf-landing-headline">
          Generate production-ready <br />
          software architectures.
        </h1>
        <p className="bf-landing-subline">
          Convert your application concept into interactive, layered system diagrams, <br />
          structured folder configurations, and core boilerplate code in seconds.
        </p>
      </div>
    </div>
  );
}