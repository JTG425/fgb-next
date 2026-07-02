"use client";

import "@/styles/componentstyles/moviecard.css";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const NO_IMAGE_URL =
  "https://fgbtheatersstoragef2bb9-dev.s3.amazonaws.com/public/images/noimage.png";

const convertToStandardTime = (militaryTime) => {
  const hoursMinutes = militaryTime.match(/(\d{2})(\d{2})/);
  let hours = parseInt(hoursMinutes[1], 10);
  const minutes = hoursMinutes[2];
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${suffix}`;
};

const createDisplayDate = (date) => {
  const month = date.slice(0, 2);
  const day = date.slice(2, 4);
  const year = date.slice(4, 8);
  return `${month} / ${day} / ${year}`;
};

// Takes in length in mins (String) and returns a string in hours and minutes
const createDisplayTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}HR ${minutes}MIN`;
};

// A trailer link is only playable if it points at an actual video
// (the data sometimes contains bare "https://www.youtube.com/embed/" stubs).
const hasTrailer = (trailer) =>
  Boolean(trailer) && !trailer.endsWith("/embed/") && trailer.trim() !== "";

function Poster({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`poster-frame${loaded ? " loaded" : ""}`}>
      <img
        className="poster"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function TrailerModal({ film, onClose }) {
  // Escape closes; the page never scrolls underneath the open modal.
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="trailer-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <button
        className="close-trailer"
        onClick={onClose}
        aria-label="Close trailer"
      >
        <IoCloseOutline />
      </button>

      <motion.div
        className="trailer-container"
        role="dialog"
        aria-modal="true"
        aria-label={`${film.name} details`}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="trailer-header">
          <h2>{film.name}</h2>
        </span>
        {hasTrailer(film.trailer) && (
          <iframe
            title="trailer"
            className="youtube-trailer"
            type="text/html"
            src={`${film.trailer}?autoplay=1`}
            width="480"
            height="390"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
        <div className="movie-info">
          <span className="movie-stats">
            <p>{film.rating}</p>
            <span className="stat-dot" aria-hidden="true" />
            <p>{createDisplayTime(film.length)}</p>
          </span>
          <p className="movie-description">{film.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MovieCard({ date, capShows, parShows, selectedTheater }) {
  const displayDate = createDisplayDate(date);
  const [selectedFilm, setSelectedFilm] = useState(null);

  // Derive the visible films directly — no state/effect round-trips.
  const films = useMemo(() => {
    const shows = selectedTheater === "capitol" ? capShows : parShows;
    if (!shows) return [];
    return shows.filter((film) => film.show.some((show) => show.date === date));
  }, [selectedTheater, capShows, parShows, date]);

  const isAnyMovies = films.length > 0;

  return (
    <div className="movieCard">
      <AnimatePresence mode="popLayout">
        {isAnyMovies ? (
          films.map((film, filmIndex) => (
            <motion.article
              className="film card card-hover"
              key={`movie-${filmIndex}-${film.name}`}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{
                duration: 0.5,
                type: "spring",
                bounce: 0.25,
                delay: Math.min(filmIndex * 0.06, 0.3),
              }}
            >
              <div className="poster-container">
                <Poster
                  src={
                    film.poster === NO_IMAGE_URL
                      ? "/assets/noimage.webp"
                      : film.poster
                  }
                  alt={film.name}
                />
              </div>
              <div className="film-header">
                <a
                  href={film.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="film-name-link"
                >
                  <h3 className="film-name">{film.name}</h3>
                </a>
                <span className="film-info">
                  <p>{film.rating}</p>
                  <span className="stat-dot" aria-hidden="true" />
                  <p>{createDisplayTime(film.length)}</p>
                  <button
                    className="film-trailer"
                    onClick={() => setSelectedFilm(film)}
                    aria-label={`About ${film.name}${
                      hasTrailer(film.trailer) ? " and trailer" : ""
                    }`}
                  >
                    <FaInfoCircle aria-hidden="true" />
                    <span className="film-trailer-label">Info</span>
                  </button>
                </span>
                <div className="showtimes">
                  {film.show
                    .filter((show) => show.date === date)
                    .map((show, showIndex) => (
                      <a
                        className="showtime-link"
                        key={showIndex}
                        href={show.salelink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="showtime-button">
                          {convertToStandardTime(show.time)}
                          {show.Subtitles === "True" ? " (Subtitles)" : ""}
                        </span>
                      </a>
                    ))}
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <motion.div
            className="no-shows card"
            key="no-shows"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            <h2>No Scheduled Movies for {displayDate}</h2>
            <p>Grab some popcorn and hang tight!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedFilm && (
          <TrailerModal
            film={selectedFilm}
            onClose={() => setSelectedFilm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default MovieCard;
