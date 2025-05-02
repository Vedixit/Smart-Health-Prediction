import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();        // Get state passed from navigation
  const navigate = useNavigate();        // To redirect if no state is found

  // 🔐 Route Protection: Redirect to Home if prediction not available
  useEffect(() => {
    if (!location.state || !location.state.prediction) {
      navigate("/");                     // Auto redirect to Home
    }
  }, [location, navigate]);

  // ✅ Safely extract prediction only after the check
  const { prediction } = location.state || {};

  return (
    <div className="result-container">
      <h2>Prediction Result</h2>
      <p>Your predicted condition is: {prediction}</p>
    </div>
  );
}

export default Result;

