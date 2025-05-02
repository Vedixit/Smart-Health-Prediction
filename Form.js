import React, { useState } from 'react';

function SymptomForm() {
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults(null);

    if (!symptoms.trim()) {
      setError('Please enter at least one symptom.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/predict', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptoms: symptoms.trim() })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Error occurred while fetching results.');
        return;
      }

      setResults(data);
    } catch (err) {
      setError('Failed to fetch results. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Medical Illness Symptom Checker</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symptomsInput">Enter symptoms (comma separated):</label><br />
        <input
          type="text"
          id="symptomsInput"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g. fever, cough"
          style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
      </form>

      {error && (
        <div style={{ marginTop: '15px', color: 'red' }}>
          {error}
        </div>
      )}

      {results && (
        <div style={{ marginTop: '20px' }}>
          {Array.isArray(results) ? (
            results.length > 0 ? (
              results.map((disease, index) => (
                <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
                  <h3>{disease.name}</h3>
                  <p><strong>Symptoms:</strong> {disease.symptoms.join(', ')}</p>
                  <p><strong>Prevention:</strong> {disease.prevention}</p>
                  <p><strong>Remedies:</strong> {disease.remedies}</p>
                </div>
              ))
            ) : (
              <p>No diseases matched your symptoms.</p>
            )
          ) : (
            <p>{results.message || 'No results available.'}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SymptomForm;

