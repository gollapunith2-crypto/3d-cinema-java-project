import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useBookingStore from '../store/useBookingStore';
import moviesData from '../data/movies.json';
import upcomingData from '../data/upcoming.json';
import Poster from '../components/Poster';
import TrailerModal from '../components/TrailerModal';

export default function Movies() {
  const setMovie = useBookingStore((state) => state.setMovie);
  const selectedMovie = useBookingStore((state) => state.selectedMovie);
  const selectedTheatre = useBookingStore((state) => state.selectedTheatre);
  const selectedTime = useBookingStore((state) => state.selectedTime);
  const navigate = useNavigate();
  const [activeTrailer, setActiveTrailer] = useState(null);

  useEffect(() => {
    console.log('Mock movies:', moviesData);
    console.log('Booking store state:', { selectedMovie, selectedTheatre, selectedTime });
  }, [selectedMovie, selectedTheatre, selectedTime]);

  const handleMovieSelect = (movie) => {
    setMovie(movie);
    navigate('/theatres');
  };

  const openTrailer = (e, movie) => {
    e.stopPropagation();
    if (!movie.trailerUrl) return;
    setActiveTrailer({ id: movie.trailerUrl, title: movie.title });
  };

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Now Showing</h1>
      <div className="movie-grid">
        {moviesData.map((movie) => (
          <motion.div
            key={movie.id}
            className="glass-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMovieSelect(movie)}
          >
            <Poster src={movie.posterUrl} alt={movie.title} title={movie.title} />
            <div className="card-content">
              <h2>{movie.title}</h2>
              <p>{movie.genre}</p>
              <p>{movie.duration}</p>
              <button className="trailer-btn" onClick={(e) => openTrailer(e, movie)}>
                Play Trailer
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 style={{ marginTop: '2rem', padding: '0 2rem' }}>Upcoming Films</h2>
      <div className="movie-grid">
        {upcomingData.map((movie) => (
          <motion.div key={movie.id} className="glass-card">
            <Poster src={movie.posterUrl} alt={movie.title} title={movie.title} />
            <div className="card-content">
              <h2>{movie.title}</h2>
              <p>{movie.genre}</p>
              <p>{movie.duration}</p>
              <button className="trailer-btn" onClick={(e) => openTrailer(e, movie)}>
                Play Trailer
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {activeTrailer && (
        <TrailerModal
          videoId={activeTrailer.id}
          title={activeTrailer.title}
          onClose={() => setActiveTrailer(null)}
        />
      )}
    </motion.div>
  );
}
