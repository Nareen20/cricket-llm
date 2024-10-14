import React, { useState } from 'react';
import axios from 'axios';

const PlayerProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playerInfo, setPlayerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setPlayerInfo(null);

    try {
      const response = await axios.get('https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/search', {
        params: {
          plrN: searchQuery
        },
        headers: {
          'X-RapidAPI-Key': '9b7ba12aa7msh1d30cd99588ccd6p198038jsn036f5af2857f',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        },
        timeout: 10000 // Set a timeout of 10 seconds
      });

      console.log(response.data); // Log the API response to the console

      if (response.data && response.data.player && response.data.player.length > 0) {
        const filteredPlayers = response.data.player.filter(player => 
          player.name.toLowerCase() === searchQuery.toLowerCase()
        );
        if (filteredPlayers.length > 0) {
          setSearchResults(filteredPlayers);
        } else {
          setError('No players found. Please enter a correct player name.');
          setSearchResults([]);
        }
      } else {
        setError('No players found. Please enter a correct player name.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching player:', error);
      if (error.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again later.');
      } else {
        setError('Error searching player. Please try again later.');
      }
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerClick = async (playerId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${playerId}`, {
        headers: {
          'X-RapidAPI-Key': '9b7ba12aa7msh1d30cd99588ccd6p198038jsn036f5af2857f',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        },
        timeout: 10000 // Set a timeout of 10 seconds
      });
      setPlayerInfo(response.data);
    } catch (error) {
      console.error('Error fetching player info:', error);
      if (error.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again later.');
      } else {
        setError('Error fetching player info. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter player name"
      />
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map(player => (
            <li key={player.id} onClick={() => handlePlayerClick(player.id)}>
              {player.name}
            </li>
          ))}
        </ul>
      </div>

      {playerInfo && (
        <div>
          <h2>{playerInfo.name}</h2>
          <p>Team: {playerInfo.teamName}</p>
          <p>Role: {playerInfo.role}</p>
          <p>Country: {playerInfo.intlTeam}</p>
          <p>Bat: {playerInfo.bat}</p>
          <p>Bowl: {playerInfo.bowl}</p>
          <p>Nick Name: {playerInfo.nickName}</p>
          <p>Height: {playerInfo.height}</p>
          <p>Birth Place: {playerInfo.birthPlace}</p>
          <p>Date of Birth: {playerInfo.DoB}</p>
          <p>Image: <img src={playerInfo.image} alt={playerInfo.name} /></p>
          <p>Bio: {playerInfo.bio}</p>
          <p>Rankings:</p>
          <ul>
            <li>Test Rank: {playerInfo.rankings?.testRank}</li>
            <li>ODI Rank: {playerInfo.rankings?.odiRank}</li>
            <li>T20 Rank: {playerInfo.rankings?.t20Rank}</li>
            <li>Test Best Rank: {playerInfo.rankings?.testBestRank}</li>
            <li>ODI Best Rank: {playerInfo.rankings?.odiBestRank}</li>
            <li>T20 Best Rank: {playerInfo.rankings?.t20BestRank}</li>
            <li>T20 Diff Rank: {playerInfo.rankings?.t20DiffRank}</li>
          </ul>
          <p>DoB Format: {playerInfo.DoBFormat}</p>
        </div>
      )}
    </div>
  );
};

export default PlayerProfile;
