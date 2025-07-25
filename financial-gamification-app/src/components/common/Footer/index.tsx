import "./index.css";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <Link to="/">
      <div>
        <div className="footer-icon">🏠</div>
        <div className="footer-description">Home</div>
      </div>
    </Link>
    <Link to="/games">
      <div>
        <div className="footer-icon">🎮</div>
        <div className="footer-description">Games</div>
      </div>
    </Link>
    <Link to="/chat-assistant">
      <div>
        <div className="footer-icon">🤖</div>
        <div className="footer-description">Assistant</div>
      </div>
    </Link>
  </footer>
);

export default Footer;
