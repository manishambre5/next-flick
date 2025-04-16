import React, { useState, useEffect } from 'react';
import { LuFilm } from "react-icons/lu";
import { PiFilmReel, PiFilmReelFill, PiFilmSlate, PiFilmSlateFill, PiPopcornFill, PiPopcorn } from "react-icons/pi";
import { BiCameraMovie, BiMoviePlay, BiSolidCameraMovie, BiSolidMoviePlay } from "react-icons/bi";

const icons = [LuFilm, PiFilmReel, PiFilmReelFill, PiFilmSlate, PiFilmSlateFill, PiPopcorn, PiPopcornFill, BiCameraMovie, BiSolidCameraMovie, BiMoviePlay, BiSolidMoviePlay];

const IconsBackground = () => {
  const [randomIcons, setRandomIcons] = useState([]);
  const [numIcons, setNumIcons] = useState(50);

  // Adjusting the number of icons based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setNumIcons(40);
      } else if (window.innerWidth < 1024) {
        setNumIcons(30);
      } else {
        setNumIcons(50);
      }
    };

    handleResize();

    // Event listener to adjust on resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const iconGrid = [];
    for (let i = 0; i < numIcons; i++) {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      iconGrid.push(randomIcon);
    }
    setRandomIcons(iconGrid);
  }, [numIcons]);


  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-4 pointer-events-none -z-10">
      {randomIcons.map((Icon, index) => (
        <div key={index} className="flex justify-center items-center w-full h-full">
          <Icon className="text-5xl md:text-8xl text-black" style={{ opacity: (Math.random() * (0.12 - 0.03) + 0.05).toFixed(2) }} />
        </div>
      ))}
    </div>
  );
};

export default IconsBackground;