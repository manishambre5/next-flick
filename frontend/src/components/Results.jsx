import React from 'react';
import { FaImdb, FaWikipediaW } from "react-icons/fa";
import { SiThemoviedatabase } from "react-icons/si";

const Results = ({ results, error, query, loading }) => {
  return (
    <main className='flex flex-col gap-4 justify-center items-center md:p-4 w-full font-display'>
      
      {error && <p className="text-red-700 text-2xl px-4 text-center">{error}</p>}

      <section className='w-sm md:w-3xl overflow-hidden md:bg-white md:shadow-2xl'>
        <section className='flex overflow-x-auto snap-mandatory snap-x scroll-smooth scrolling-touch'>
          {results.map((movie) => (
            <article key={movie.title} className='w-full flex flex-col md:flex-row gap-2 md:gap-4 shrink-0 items-center justify-baseline md:items-start md:justify-evenly p-4 m-2 text-black snap-start'>
              <aside className='md:shrink-0 flex flex-col items-center justify-between gap-2'>
                {movie.poster_path && (
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className='w-full' />
                )}
                <section className='flex gap-2 justify-around w-full text-4xl bg-white'>
                  <a href={`https://www.themoviedb.org/movie/${movie.tmdb_id}`}>
                    <SiThemoviedatabase className='hover:text-teal-400 transition-all ease-linear' />
                  </a>
                  <a href={`https://www.imdb.com/title/${movie.imdb_id}/`}>
                    <FaImdb className='hover:text-amber-300 transition-all ease-linear' />
                  </a>
                  <a href={`https://en.wikipedia.org/wiki/${movie.title.replace(/\s+/g, '_')}`}>
                    <FaWikipediaW className='hover:text-gray-400 transition-all ease-linear' />
                  </a>
                </section>
              </aside>
              <section className='flex flex-col justify-baseline items-start border-1 md:border-y-0 md:border-r-0 md:border-l-1 p-4 bg-white md:bg-transparent'>
                <h1 className='text-3xl md:text-5xl'>{movie.title}</h1>
                <p className='md:text-lg italic line-clamp-4'>{movie.overview}</p>
              </section>
            </article>
          ))}
        </section>
      </section>

      {results.length > 0 && (
        <p className='text-xl font-bold text-gray-700 hover:text-gray-500 cursor-default text-center'>
          Not interested / Already Watched? Swipe for more recommendations!
        </p>
      )}
    </main>
  );
};

export default Results;