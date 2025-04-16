import React from 'react';

const Header = ({ query, setQuery, suggestions, handleSearch, results }) => {
  return (
    <header className='flex flex-col gap-4 justify-center items-center py-7'>
      <h1 className='font-header cursor-default text-black text-7xl'>next flick</h1>
      <p className='font-display px-4 text-center text-lg font-bold'>There's just too much GOOD CINEMA in the world to settle for a bad movie.</p>
      <form className='flex md:w-1/2 relative bg-white font-display'
        onSubmit={(e) => {
          e.preventDefault();  // Prevent default form submission
          handleSearch();
        }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Enter a good film that you love!"
          className='border-1 p-2 box-border border-r-0 outline-0 w-full'
        />
        <button type='submit' className='p-2 bg-black hover:bg-white hover:text-black box-border border-1 border-black text-white text-sm transition-all shrink-0'>
          Get a recommendation
        </button>

        {suggestions.length > 0 && (
          <ul className="bg-white text-black max-h-60 overflow-y-auto absolute top-12 w-full border-1">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                className="p-2 hover:bg-gray-900 hover:text-white transition-all cursor-pointer"
                onClick={() => { setQuery(suggestion); }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
      
      {suggestions.length === 0 && results.length === 0 && query && (
        <p className="fixed bottom-0 text-xl text-gray-700 text-center px-4">
          No results found for "{query}"
        </p>
      )}
    </header>
  );
};

export default Header;
