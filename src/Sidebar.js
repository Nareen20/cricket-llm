import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import 'boxicons/css/boxicons.min.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="logo_details">
        <i className="bx bxl-audible icon"></i>
        <div className="logo_name">Cric Bee</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/">
            <i className="bx bx-home"></i>
            <span className="link_name">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/playerprofile">
            <i className="bx bx-user"></i>
            <span className="link_name">Players Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/cricgpt">
            <i className="bx bx-chat"></i>
            <span className="link_name">CricGPT</span>
          </Link>
        </li>
        <li>
          <Link to="/high">
            <i className="bx bx-video"></i>
            <span className="link_name">Highlights</span>
          </Link>
        </li>
        <li>
          <Link to="/teams">
            <i className="bx bx-group"></i>
            <span className="link_name">Teams</span>
          </Link>
        </li>
        <li>
          <Link to="/analysis">
            <i className="bx bx-bar-chart"></i>
            <span className="link_name">Analysis</span>
          </Link>
        </li>
        <li>
          <Link to="/rankings">
            <i className="bx bx-list-ul"></i>
            <span className="link_name">Rankings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
