import React, { useState, useEffect } from 'react';
import { ai_suggestion_backend } from 'declarations/ai_suggestion_backend';
import './index.scss'

function App() {
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    const res = await ai_suggestion_backend.getSuggestions();
    setSuggestions(res);
  };

  const submitSuggestion = async () => {
    await ai_suggestion_backend.addSuggestion(content, summary);
    setContent('');
    setSummary('');
    fetchSuggestions();
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="suggestion-container">
      <h1>AI Suggestion Box</h1>
      <div className="suggestion-input">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your idea..."
        />
        <input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Short summary"
        />
        <button onClick={submitSuggestion}>Submit Suggestion</button>
      </div>
      <div className="suggestion-list">
        {suggestions.map((sug, i) => (
          <div className="suggestion-card" key={i}>
            <p>{sug.content}</p>
            <span><em>{sug.summary}</em></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
