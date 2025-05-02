import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState('');
  const [treatment, setTreatment] = useState('');
  const [prevention, setPrevention] = useState('');

  useEffect(() => {
    // Skip if formData is empty
    if (!formData || Object.keys(formData).length === 0) return;

    const fetchPrediction = async () => {
      try {
        const res = await axios.post('http://localhost:5000/predict', formData);
        setResult(res.data.prediction);
        setTreatment(res.data.treatment);
        setPrevention(res.data.prevention);
      } catch (err) {
        console.error('Error fetching prediction:', err);
      }
    };

    fetchPrediction();
  }, [formData]);

  return (
    <div className="App">
      <h2>Smart Health Prediction System</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const symptoms = e.target.elements.symptoms.value;
          setFormData({ symptoms });
        }}
      >
        <input type="text" name="symptoms" placeholder="Enter symptoms (e.g. cough, fever)" required />
        <button type="submit">Predict</button>
      </form>

      {result && (
        <div>
          <h3>Prediction: {result}</h3>
          <p><strong>Treatment:</strong> {treatment}</p>
          <p><strong>Prevention:</strong> {prevention}</p>
        </div>
      )}
    </div>
  );
}


export default App;
