import React from 'react';

const Scoreboard = ({ score, wickets, balls }) => {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <p>Score: {score}</p>
      <p>Wickets: {wickets}</p>
      <p>Balls: {balls}</p>
    </div>
  );
};

export default Scoreboard;
