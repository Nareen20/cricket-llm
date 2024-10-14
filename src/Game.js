import React, { useState } from 'react';
import Scoreboard from './Scoreboard';
import GameButton from './GameButton';

const Game = () => {
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [message, setMessage] = useState('');

  const handleBowl = () => {
    if (wickets < 10) {
      const run = Math.floor(Math.random() * 7); // Random runs from 0 to 6
      if (run === 0) {
        setWickets(wickets + 1);
        setMessage('Oh no! You got out.');
      } else {
        setScore(score + run);
        setMessage(`You scored ${run} run${run > 1 ? 's' : ''}!`);
      }
      setBalls(balls + 1);
    } else {
      setMessage('All wickets are down. Game over!');
    }
  };

  return (
    <div className="game-container">
      <h2>Cricket Game</h2>
      <Scoreboard score={score} wickets={wickets} balls={balls} />
      <GameButton onBowl={handleBowl} />
      <p>{message}</p>
    </div>
  );
};

export default Game;
