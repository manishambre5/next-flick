import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  // Update suggestions every time the user types
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
    <header>
      <h1 className='text-5xl md:text-7xl text-center font-mono p-4'>next flick</h1>
    </header>
    <main className='flex flex-col gap-4 justify-center items-center p-4 w-full'>
      <form className='flex md:w-1/2 relative'
        onSubmit={(e) => {
          e.preventDefault();  // Prevent default form submission
          handleSearch();
        }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Enter a film that you love!"
          className='border-1 p-2 box-border border-r-0 outline-0 w-full'
        />
        <button type='submit' className='p-2 bg-black hover:bg-white hover:text-black box-border border-1 border-black text-white text-sm transition-all shrink-0'>Get a recommendation</button>

        {suggestions.length > 0 && (
        <ul className="bg-white text-black max-h-60 overflow-y-auto absolute top-12 w-full">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              className="p-2 hover:bg-gray-900 hover:text-white transition-all cursor-pointer"
              onClick={() => {setQuery(suggestion); setSuggestions([])}}
            >
              {suggestion}
            </li>))}
          </ul>)}
      </form>

      {error && <p className="text-red-700 mt-4 text-2xl">{error}</p>}

      <section className='w-sm md:w-3xl overflow-hidden'>
        <section className='flex overflow-x-auto snap-mandatory snap-x scroll-smooth scrolling-touch'>
          {results.map((movie) => (
            <article key={movie.title} className='w-full flex flex-col md:flex-row gap-2 md:gap-4 shrink-0 items-center justify-baseline md:items-start md:justify-evenly p-4 m-2 text-black'>
              <aside className='md:h-2/3 md:shrink-0'>
                {movie.poster_path && (
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className='w-full' />
                )}
              </aside>
              <section className='flex flex-col justify-baseline items-start border-t-1 md:border-t-0 md:border-l-1 pl-2'>
                <h1 className='text-3xl md:text-5xl'>{movie.title}</h1>
                <p className='md:text-lg italic'>{movie.overview}</p>
              </section>
            </article>
            ))
          }
          </section>
        </section>
        {results.length > 0 && <p className='text-lg text-gray-500 hover:text-gray-700 cursor-default text-center'>Not interested / Already Watched? Swipe for more recommendations!</p>}

        {suggestions.length === 0 && results.length === 0 && !loading && query && (
          <p className="text-xl text-gray-700 text-center">
            No results found for "{query}". Try another movie.</p>)}
    </main>
    </>
  );
}

export default App;