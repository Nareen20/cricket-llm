import React, { useState, useEffect } from 'react';
import './Teams.css';
const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('/team.json')
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div>
      <nav className="navbar">
        <ul>
          {/* <li><a href="#" id="teamsLink">Teams</a></li>
          <li><a href="#" id="matchesLink">Matches</a></li>
          <li><a href="#" id="scheduleLink">Schedule</a></li>
          <li><a href="#" id="statsLink">Statistics</a></li>
          <li><a href="#" id="newsLink">News</a></li> */}
        </ul>
      </nav>
      <div className="content">
        <section id="teams">
          <div id="teamButtons">
            {teams.map((team) => (
              <button
                key={team.name}
                className="teamButton"
                onClick={() => setSelectedTeam(team.name.toLowerCase())}
              >
                {team.name}
              </button>
            ))}
          </div>

          {selectedTeam && (
            <div className="teamDetails">
              <h2>{selectedTeam.charAt(0).toUpperCase() + selectedTeam.slice(1)} squad</h2>
              <table>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.find((team) => team.name.toLowerCase() === selectedTeam)?.players.map((player, index) => (
                    <tr key={index}>
                      <td>{player.name}</td>
                      <td>{player.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Teams;
