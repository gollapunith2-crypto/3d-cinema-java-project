import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useBookingStore from '../store/useBookingStore';
import theatresData from '../data/theatres.json';

export default function Theatres() {
  const { selectedMovie, setTheatre, setTime } = useBookingStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedMovie) {
      navigate('/');
    }
  }, [selectedMovie, navigate]);

  if (!selectedMovie) {
    return null;
  }

  const handleTimeSelect = (theatre, time) => {
    setTheatre(theatre);
    setTime(time);
    navigate('/seats');
  };

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>
        Select Theatre for {selectedMovie.title}
      </h2>
      <div className="theatre-list">
        {theatresData.map((theatre) => (
          <div className="theatre-card" key={theatre.id}>
            <h3>{theatre.name}</h3>
            <p style={{ color: '#a5a5b2' }}>{theatre.location}</p>
            <div className="times-grid">
              {theatre.showtimes.map((time) => (
                <motion.button
                  key={time}
                  className="time-pill"
                  onClick={() => handleTimeSelect(theatre, time)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
