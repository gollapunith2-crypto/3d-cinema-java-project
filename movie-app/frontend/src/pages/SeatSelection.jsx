import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../store/useBookingStore';

export default function SeatSelection() {
  const { selectedMovie, selectedTheatre, selectedTime, selectedSeat, setSeat } =
    useBookingStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedMovie || !selectedTheatre) {
      navigate('/');
      return;
    }
    const resetLegacyScreen = () => {
      const vl = document.getElementById('videoLayer');
      const fr = document.getElementById('vFrame');
      if (vl) vl.classList.remove('on');
      if (fr) fr.src = '';
    };
    // Reset the legacy screen on mount so no stale src from a previous route can autoplay
    resetLegacyScreen();
    window.currentBookingContext = {
      movie: selectedMovie,
      theatre: selectedTheatre,
      time: selectedTime,
    };
    window.updateReactSeat = (seatId) => {
      useBookingStore.getState().setSeat(seatId);
    };
    return () => {
      delete window.updateReactSeat;
      window.currentBookingContext = null;
      resetLegacyScreen();
    };
  }, [selectedMovie, selectedTheatre, selectedTime, navigate, setSeat]);

  if (!selectedMovie) {
    return null;
  }

  return (
    <div className="hud-container">
      <div className="hud-panel">
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>
            {selectedTheatre?.name} • {selectedTime}
          </p>
        </div>
        <button className="hud-btn-secondary" onClick={() => navigate('/theatres')}>
          Change Time/Theatre
        </button>
      </div>

      <div className="hud-panel">
        <div>
          <h3>Select your seats in 3D</h3>
          <p>
            {selectedSeat
              ? `Seat Selected: ${selectedSeat}`
              : 'Interact with the map below'}
          </p>
        </div>
        <button className="hud-btn-primary" onClick={() => navigate('/checkout')}>
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}
