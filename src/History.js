import React from 'react';
// import './History.css';

const History = ({ history, onSelectQuestion }) => {
  return (
    <div className="history-container">
      <h2>Chat History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index} onClick={() => onSelectQuestion(entry)}>
            {entry.question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
