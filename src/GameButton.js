import React from 'react';

const GameButton = ({ onBowl }) => {
  return (
    <button className="game-button" onClick={onBowl}>
      Bowl
    </button>
  );
};

export default GameButton;
