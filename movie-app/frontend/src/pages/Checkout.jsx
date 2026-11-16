import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useBookingStore from '../store/useBookingStore';

export default function Checkout() {
  const { selectedMovie, selectedTheatre, selectedTime, selectedSeat } = useBookingStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!selectedSeat) {
      navigate('/');
    }
  }, [selectedSeat, navigate]);

  if (!selectedSeat) {
    return null;
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    const payload = {
      movieId: selectedMovie.id,
      theatreId: selectedTheatre.id,
      showDate: 'Sun, 15',
      showTime: selectedTime,
      seatId: selectedSeat,
      totalAmount: 600.0,
    };

    try {
      const response = await fetch('http://localhost:8080/api/cinema/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate('/success');
      } else {
        setIsProcessing(false);
        console.error('Booking failed:', await response.text());
      }
    } catch (error) {
      setIsProcessing(false);
      console.error('Booking failed:', error);
    }
  };

  return (
    <motion.div
      className="page-container checkout-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="receipt-card">
        <h2 style={{ marginBottom: '1.5rem' }}>Order Summary</h2>

        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>{selectedMovie.title}</h3>
          <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>
            {selectedTheatre.name} • {selectedTime} • Seat {selectedSeat}
          </p>
        </div>

        <div className="price-row">
          <span>Ticket Price</span>
          <span>₹560.00</span>
        </div>
        <div className="price-row">
          <span>Convenience Fee</span>
          <span>₹40.00</span>
        </div>
        <div className="total-row">
          <span>Total Amount</span>
          <span>₹600.00</span>
        </div>

        <button className="pay-btn" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay ₹600.00'}
        </button>
      </div>
    </motion.div>
  );
}
