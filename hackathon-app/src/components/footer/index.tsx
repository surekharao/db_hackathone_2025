import { Link, useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return isLoginPage ? null : (
    <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 border-t-1">
      <Link to="/chat" className="cursor-pointer text-center py-2 border-r-1">
        AI 🤖
      </Link>
      <Link to="/game" className="cursor-pointer text-center py-2">
        Game 🎮
      </Link>
    </div>
  );
};

export default Footer;
