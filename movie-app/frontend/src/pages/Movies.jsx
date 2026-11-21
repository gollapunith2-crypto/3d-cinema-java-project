import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useBookingStore from '../store/useBookingStore';
import moviesData from '../data/movies.json';
import upcomingData from '../data/upcoming.json';
import Poster from '../components/Poster';
import TrailerModal from '../components/TrailerModal';
import './Movies.css';

export default function Movies() {
  const setMovie = useBookingStore((state) => state.setMovie);
  const selectedMovie = useBookingStore((state) => state.selectedMovie);
  const selectedTheatre = useBookingStore((state) => state.selectedTheatre);
  const selectedTime = useBookingStore((state) => state.selectedTime);
  const navigate = useNavigate();

  const [activeTrailer, setActiveTrailer] = useState(null);
  const [featuredMovie, setFeaturedMovie] = useState(moviesData[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    console.log('Booking store state:', { selectedMovie, selectedTheatre, selectedTime });
  }, [selectedMovie, selectedTheatre, selectedTime]);

  const genres = useMemo(() => {
    const set = new Set(['All']);
    moviesData.forEach((m) => {
      (m.genre || '')
        .split('/')
        .map((g) => g.trim())
        .filter(Boolean)
        .forEach((g) => set.add(g));
    });
    return Array.from(set);
  }, []);

  const filteredMovies = useMemo(() => {
    return moviesData.filter((m) => {
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre =
        selectedGenre === 'All' ||
        (m.genre || '').toLowerCase().includes(selectedGenre.toLowerCase());
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const handleMovieSelect = (movie) => {
    setMovie(movie);
    navigate('/theatres');
  };

  const openTrailer = (e, movie) => {
    e.stopPropagation();
    if (!movie.trailerUrl) return;
    setActiveTrailer({ id: movie.trailerUrl, title: movie.title });
  };

  const heroMovie = featuredMovie || moviesData[0];

  return (
    <motion.div
      className="cinema-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dynamic blurred backdrop */}
      {heroMovie && (
        <div
          className="cinema-backdrop"
          style={{ backgroundImage: `url(${heroMovie.posterUrl})` }}
        />
      )}

      <div className="cinema-content">
        {/* Top Navigation Bar */}
        <header className="cinema-nav">
          <div className="cinema-brand">
            <span className="cinema-brand-dot" />
            <span>Vantage 3D Cinema</span>
          </div>

          <div className="cinema-controls">
            <input
              type="text"
              className="cinema-search"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="cinema-pills">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={`cinema-pill ${selectedGenre === genre ? 'active' : ''}`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Featured Hero Banner */}
        {heroMovie && (
          <section className="cinema-hero">
            <div
              className="cinema-hero-bg"
              style={{ backgroundImage: `url(${heroMovie.posterUrl})` }}
            />
            <div className="cinema-hero-info">
              <div className="cinema-hero-kicker">Featured in 3D Theatre</div>
              <h1 className="cinema-hero-title">{heroMovie.title}</h1>
              <div className="cinema-hero-meta">
                <span className="cinema-tag imax">IMAX 3D</span>
                <span className="cinema-tag">DOLBY ATMOS</span>
                <span>{heroMovie.genre}</span>
                <span>•</span>
                <span>{heroMovie.duration}</span>
              </div>
              <div className="cinema-hero-actions">
                <button
                  type="button"
                  className="btn-primary-cinema"
                  onClick={() => handleMovieSelect(heroMovie)}
                >
                  Book 3D Seats
                </button>
                <button
                  type="button"
                  className="btn-secondary-cinema"
                  onClick={(e) => openTrailer(e, heroMovie)}
                >
                  ▶ Watch Trailer
                </button>
              </div>
            </div>
            <div className="cinema-hero-poster-wrap">
              <Poster src={heroMovie.posterUrl} alt={heroMovie.title} title={heroMovie.title} />
            </div>
          </section>
        )}

        {/* Now Showing Grid */}
        <div className="cinema-section-head">
          <h2>Now Showing</h2>
          <span className="cinema-section-count">{filteredMovies.length} movies</span>
        </div>

        <div className="cinema-grid">
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              className="cinema-card"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setFeaturedMovie(movie)}
              onClick={() => handleMovieSelect(movie)}
            >
              <div className="cinema-card-media">
                <div className="cinema-card-badges">
                  <span className="cinema-tag imax">3D</span>
                  <span className="cinema-tag">ATMOS</span>
                </div>
                <Poster src={movie.posterUrl} alt={movie.title} title={movie.title} />
              </div>
              <div className="cinema-card-body">
                <h3 className="cinema-card-title">{movie.title}</h3>
                <p className="cinema-card-meta">
                  {movie.genre} • {movie.duration}
                </p>
                <div className="cinema-card-actions">
                  <button
                    type="button"
                    className="btn-primary-cinema"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMovieSelect(movie);
                    }}
                  >
                    Book Seats
                  </button>
                  <button
                    type="button"
                    className="btn-secondary-cinema"
                    onClick={(e) => openTrailer(e, movie)}
                  >
                    ▶ Trailer
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Films Grid */}
        {upcomingData.length > 0 && (
          <>
            <div className="cinema-section-head">
              <h2>Upcoming Films</h2>
              <span className="cinema-section-count">{upcomingData.length} coming soon</span>
            </div>

            <div className="cinema-grid">
              {upcomingData.map((movie) => (
                <motion.div
                  key={movie.id}
                  className="cinema-card"
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => setFeaturedMovie(movie)}
                >
                  <div className="cinema-card-media">
                    <div className="cinema-card-badges">
                      <span className="cinema-tag">COMING SOON</span>
                    </div>
                    <Poster src={movie.posterUrl} alt={movie.title} title={movie.title} />
                  </div>
                  <div className="cinema-card-body">
                    <h3 className="cinema-card-title">{movie.title}</h3>
                    <p className="cinema-card-meta">
                      {movie.genre} • {movie.duration}
                    </p>
                    <div className="cinema-card-actions">
                      <button
                        type="button"
                        className="btn-secondary-cinema"
                        onClick={(e) => openTrailer(e, movie)}
                      >
                        ▶ Watch Trailer
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
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