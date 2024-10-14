import React, { useState, useEffect } from 'react';
import './High.css'; // Import CSS file for styling

const High = () => {
  const [matchesData, setMatchesData] = useState([]);
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);
  const [randomMatches, setRandomMatches] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  // Function to fetch data from mainData.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mainData.json'); // Adjust path as needed
        const data = await response.json();
        setMatchesData(data[1].data); // Assuming 'data' is an array of matches
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to populate select options with match titles
  const populateMatchOptions = () => {
    return matchesData.map((match, index) => (
      <option key={index} value={index}>{match.title}</option>
    ));
  };

  // Function to fetch and display 10 random highlights
  const fetchRandomHighlights = () => {
    const selectedIndex = selectedMatchIndex;

    // Generate 10 random matches (excluding the selected one)
    const randomMatchesArray = [];
    for (let i = 0; i < 10; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * matchesData.length);
      } while (randomIndex === selectedIndex || randomMatchesArray.includes(matchesData[randomIndex])); // Ensure not to include the selected match or duplicates
      randomMatchesArray.push(matchesData[randomIndex]);
    }
    setRandomMatches(randomMatchesArray);
  };

  // Event handler for select change
  const handleMatchSelectChange = (event) => {
    setSelectedMatchIndex(event.target.value);
  };

  // Function to handle video link click
  const handleVideoClick = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      window.open(url, '_blank');
    } else {
      setVideoUrl(url);
    }
  };

  // Function to determine the video player type based on the URL
  const getVideoPlayer = () => {
    if (videoUrl.includes('bcci.tv')) {
      return (
        <iframe
          title="BCCI Video Player"
          width="560"
          height="315"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else if (videoUrl.includes('iplt20.com')) {
      return (
        <iframe
          title="IPL Video Player"
          width="560"
          height="315"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      return (
        <video width="560" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className="main">
      <h1>Choose from Available Highlights</h1>
      <div className="content">
        <div className="highlights">
          {/* <select id="matchSelect" onChange={handleMatchSelectChange}>
            {matchesData && populateMatchOptions()}
          </select> */}
          <button id="fetchBtn" onClick={fetchRandomHighlights}>Fetch 10 Random Highlights</button>
          <ul id="matchesList">
            {randomMatches.map((match, index) => (
              <li key={index}>
                <button className="link-button" onClick={() => handleVideoClick(match.url)}>{match.title}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="video-player">
          {videoUrl ? (
            getVideoPlayer()
          ) : (
            <p>Select a video to play</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default High;
