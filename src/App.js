import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerProfile from './PlayerProfile';
import CricGPT from './CricGPT';
import High from './High';
import Teams from './Teams';
import Home from './Home';
import Sidebar from './Sidebar';
import Analysis from './Analysis';
import Rankings from './Rankings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import './App.css';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <Router>
      <div className={`App ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <section className="page-content">
          <button id="theme-toggle" onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
          </button>
          <Routes>
            <Route path="/playerprofile" element={<PlayerProfile />} />
            <Route path="/cricgpt" element={<CricGPT />} />
            <Route path="/high" element={<High />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/" element={<Home />} /> {/* Set Home as the default route */}
          </Routes>
        </section>
      </div>
    </Router>
  );
};

export default App;

