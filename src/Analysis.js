// import React, { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import data from './data.json';
// import './Analysis.css';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Analysis = () => {
//   const [showIndiaGraph, setShowIndiaGraph] = useState(false);
//   const [showAustraliaGraph, setShowAustraliaGraph] = useState(false);

//   const indiaData = {
//     labels: data.india.map(player => player.batter),
//     datasets: [
//       {
//         label: 'Runs',
//         data: data.india.map(player => player.runs),
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   const australiaData = {
//     labels: data.australia.map(player => player.batter),
//     datasets: [
//       {
//         label: 'Runs',
//         data: data.australia.map(player => player.runs),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1
//       }
//     ]
//   };

//   return (
//     <div className="analysis-container">
//       <h2>Analysis</h2>
//       <button onClick={() => setShowIndiaGraph(!showIndiaGraph)} className="toggle-button">
//         {showIndiaGraph ? 'Hide India Graph' : 'Show India Graph'}
//       </button>
//       {showIndiaGraph && <Bar data={indiaData} />}

//       <button onClick={() => setShowAustraliaGraph(!showAustraliaGraph)} className="toggle-button">
//         {showAustraliaGraph ? 'Hide Australia Graph' : 'Show Australia Graph'}
//       </button>
//       {showAustraliaGraph && <Bar data={australiaData} />}
//     </div>
//   );
// };

// export default Analysis;


import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import data from './data.json';
import './Analysis.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analysis = () => {
  const [showIndiaGraph, setShowIndiaGraph] = useState(false);
  const [showAustraliaGraph, setShowAustraliaGraph] = useState(false);
  const [showNewzealandGraph, setShowNewzealandGraph] = useState(false);
  const [showWestindiesGraph, setShowWestindiesGraph] = useState(false);

  const indiaData = {
    labels: data.matches.find(match => match.match === 'IND vs AUS T20').teams.india.map(player => player.batter),
    datasets: [
      {
        label: 'Runs',
        data: data.matches.find(match => match.match === 'IND vs AUS T20').teams.india.map(player => player.runs),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const australiaData = {
    labels: data.matches.find(match => match.match === 'IND vs AUS T20').teams.australia.map(player => player.batter),
    datasets: [
      {
        label: 'Runs',
        data: data.matches.find(match => match.match === 'IND vs AUS T20').teams.australia.map(player => player.runs),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const newzealandData = {
    labels: data.matches.find(match => match.match === 'NZ vs WI T20').teams.new_zealand.map(player => player.batter),
    datasets: [
      {
        label: 'Runs',
        data: data.matches.find(match => match.match === 'NZ vs WI T20').teams.new_zealand.map(player => player.runs),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const westindiesData = {
    labels: data.matches.find(match => match.match === 'NZ vs WI T20').teams.west_indies.map(player => player.batter),
    datasets: [
      {
        label: 'Runs',
        data: data.matches.find(match => match.match === 'NZ vs WI T20').teams.west_indies.map(player => player.runs),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="analysis-container">
      <h2>Analysis</h2>

      <h3>IND vs AUS T20</h3>
      <button onClick={() => setShowIndiaGraph(!showIndiaGraph)} className="toggle-button">
        {showIndiaGraph ? 'IND Players Score(Hide)' : 'IND Players Score(Show)'}
      </button>
      {showIndiaGraph && <Bar data={indiaData} />}

      <button onClick={() => setShowAustraliaGraph(!showAustraliaGraph)} className="toggle-button">
       {showAustraliaGraph ? 'AUS Players Socre(Hide)' : 'AUS Players Score(Show)'}
      </button>
      {showAustraliaGraph && <Bar data={australiaData} />}

      <h3>NZ vs WI T20</h3>
      <button onClick={() => setShowNewzealandGraph(!showNewzealandGraph)} className="toggle-button">
        {showNewzealandGraph ? 'Hide Newzealand Graph' : 'Show Newzealand Graph'}
      </button>
      {showNewzealandGraph && <Bar data={newzealandData} />}

      <button onClick={() => setShowWestindiesGraph(!showWestindiesGraph)} className="toggle-button">
        {showWestindiesGraph ? 'Hide Westindies Graph' : 'Show Westindies Graph'}
      </button>
      {showWestindiesGraph && <Bar data={westindiesData} />}
    </div>
  );
};

export default Analysis;
