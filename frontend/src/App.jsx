import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconsBackground from './components/IconsBackground';
import Header from './components/Header';
import Results from './components/Results';
import Tip from './components/Tip';

function App() {
  const [query, setQuery] = useState(''); // Search Query state
  const [results, setResults] = useState([]); // Search Results state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [suggestions, setSuggestions] = useState([]); // Search auto-complete state

  const fetchSuggestions = async (query) => {
    if (query.trim() === '') {
      setSuggestions([]); // Clear suggestions if query is empty
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/search_suggestions', {
        params: { query: query.toLowerCase() }
      });
      setSuggestions(response.data); // Set the suggestions from the API
    } catch (error) {
      setError('Failed to fetch suggestions. Please try again.');
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions(query);
  }, [query]);  // Runs when `query` changes

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const response = await axios.post(
        'http://localhost:5000/recommend', 
        { movie_title: query },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconsBackground />
      <Header query={query} setQuery={setQuery} suggestions={suggestions} handleSearch={handleSearch} results={results} />
      <Results results={results} error={error} query={query} loading={loading} />
      <Tip results={results} />
    </>
  );
}

export default App;