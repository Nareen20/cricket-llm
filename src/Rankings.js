// import React, { useState } from 'react';
// import './Rankings.css';
// import rankings from './rankings.json';

// const Rankings = () => {
//   const [format, setFormat] = useState('t20');
//   const [category, setCategory] = useState('batting');

//   const formats = ['t20', 'odi', 'test'];
//   const categories = ['batting', 'bowling', 'all_rounders'];

//   const handleFormatChange = (e) => {
//     setFormat(e.target.value);
//   };

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };

//   return (
//     <div className="rankings-container">
//       <h2>Player Rankings</h2>
//       <div className="selectors">
//         <select value={format} onChange={handleFormatChange}>
//           {formats.map((fmt) => (
//             <option key={fmt} value={fmt}>
//               {fmt.toUpperCase()}
//             </option>
//           ))}
//         </select>
//         <select value={category} onChange={handleCategoryChange}>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat.replace('_', ' ').toUpperCase()}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="rankings-list">
//         <div className="ranking-header">
//           <span>Position</span>
//           <span>Player</span>
//           <span>Rating</span>
//         </div>
//         {rankings[format][category].map((player) => (
//           <div key={player.serial_number} className="ranking-item">
//             <span>{player.serial_number}</span>
//             <span>{player.player}</span>
//             <span>{player.rating}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Rankings;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Rankings.css';

const Rankings = () => {
  const [format, setFormat] = useState('odi');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formats = ['odi', 't20', 'test'];

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      setError(null);

      const url = `https://crickbuzz-official-apis.p.rapidapi.com/rankings/batsman/`;
      const params = { formatType: format, women: '0' };
      const headers = {
        'x-rapidapi-key': '2148f93cc8msh80c694bb6ef5e17p1e70aajsnd35657a46548',
        'x-rapidapi-host': 'crickbuzz-official-apis.p.rapidapi.com',
      };

      try {
        const response = await axios.get(url, { params, headers });
        console.log(response.data); // Log the response data for debugging
        if (response.data && response.data.rankings && response.data.rankings[0]?.rankings) {
          setRankings(response.data.rankings[0].rankings);
        } else {
          setRankings([]);
          setError('No rankings data available.');
        }
      } catch (error) {
        setError('Error fetching rankings. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [format]);

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  return (
    <div className="rankings-container">
      <h2>Player Rankings</h2>
      <div className="selectors">
        <select value={format} onChange={handleFormatChange}>
          {formats.map((fmt) => (
            <option key={fmt} value={fmt}>
              {fmt.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="rankings-list">
          <div className="ranking-item header">
            <span>Position</span>
            <span>Player</span>
            <span>Rating</span>
          </div>
          {rankings.length > 0 ? (
            rankings.map((player, index) => (
              <div key={index} className="ranking-item">
                <span>{player.rank}</span>
                <span>{player.name}</span>
                <span>{player.rating}</span>
              </div>
            ))
          ) : (
            <p>No rankings data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Rankings;
