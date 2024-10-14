import React, { useState } from 'react';
import axios from 'axios';
import History from './History';
import './CricGPT.css';

const CricGpt = () => {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedQA, setSelectedQA] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("https://47bc-34-124-245-188.ngrok-free.app/ask", { query: question });
      const newEntry = { question, answer: response.data.response };
      setHistory([...history, newEntry]);
      setSelectedQA(newEntry);
      setQuestion('');
    } catch (error) {
      setError('Error fetching the answer');
      console.error('Error fetching the answer', error);
    }
  };

  const handleSelectQuestion = (entry) => {
    setSelectedQA(entry);
  };

  return (
    <div className="chatbot-container">
      <div className="sidebar">
        <History history={history} onSelectQuestion={handleSelectQuestion} />
      </div>
      <div className="chatbox">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={question} 
            onChange={handleInputChange} 
            placeholder="Ask a cricket question..." 
          />
          <button type="submit">Ask</button>
        </form>
        {error && <p className="error">{error}</p>}
        {selectedQA && (
          <div className="qa-display">
            <h3>Question:</h3>
            <p>{selectedQA.question}</p>
            <h3>Answer:</h3>
            <p>{selectedQA.answer}</p>
          </div>
        )}
      </div>
      <div className="history-container">
        <History history={history} onSelectQuestion={handleSelectQuestion} />
      </div>
    </div>
  );
};

export default CricGpt;