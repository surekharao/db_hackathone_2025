import "./index.css";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";

const Footer = () => {
  const location = useLocation();
  return location.pathname === "/login" ? null : (
    <footer className="footer">
      <Link
        to="/"
        className={classnames({ active: location.pathname === "/" })}
      >
        <div>
          <div className="footer-icon">🏠</div>
          <div className="footer-description">Home</div>
        </div>
      </Link>
      <Link
        to="/games"
        className={classnames({
          active: location.pathname.startsWith("/games"),
        })}
      >
        <div>
          <div className="footer-icon">🎮</div>
          <div className="footer-description">Games</div>
        </div>
      </Link>
      <Link
        to="/chat-assistant"
        className={classnames({
          active: location.pathname === "/chat-assistant",
        })}
      >
        <div>
          <div className="footer-icon">🤖</div>
          <div className="footer-description">Assistant</div>
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
