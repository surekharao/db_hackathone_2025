import "./games.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { MdLeaderboard } from "react-icons/md";
import { FaRegShareSquare } from "react-icons/fa";

const Games = () => {
  return (
    <div className="games">
      <div className="actions">
        <a>
          <MdLeaderboard />
        </a>
        <a>
          <FaRegShareSquare />
        </a>
      </div>
      <Outlet />
    </div>
  );
};

export default Games;
