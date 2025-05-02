import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Smart Health Prediction System</h1>
      <Link to="/form">
        <button className="cta-button">Start Prediction</button>
      </Link>
    </div>
  );
}

export default Home;
