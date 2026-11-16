import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useBookingStore from '../store/useBookingStore';

export default function Success() {
  const { selectedMovie, selectedTheatre, selectedTime, selectedSeat, resetBooking } =
    useBookingStore();
  const navigate = useNavigate();
  const ticketRef = useRef(null);

  useEffect(() => {
    if (!selectedMovie) {
      navigate('/');
    }
  }, [selectedMovie, navigate]);

  if (!selectedMovie) {
    return null;
  }

  const handleDownload = async () => {
    const element = ticketRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const data = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Vantage-Ticket.pdf');
  };

  const handleHome = () => {
    resetBooking();
    navigate('/');
  };

  return (
    <motion.div
      className="page-container success-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 style={{ color: '#4ade80', marginBottom: '2rem' }}>Payment Successful!</h1>

      <div className="ticket-card" ref={ticketRef}>
        <div className="ticket-header">
          <h2>{selectedMovie.title}</h2>
          <p style={{ color: '#a1a1aa' }}>Admit One</p>
        </div>
        <div className="ticket-body">
          <img src={selectedMovie.posterUrl} alt="Poster" className="ticket-poster" />
          <div className="ticket-info">
            <h3>{selectedTheatre.name}</h3>
            <p>
              <strong>Date/Time:</strong> {selectedTime}
            </p>
            <p>
              <strong>Seat:</strong>{' '}
              <span style={{ color: '#aa3bff', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {selectedSeat}
              </span>
            </p>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Vantage-${selectedSeat}`}
              alt="QR"
              className="qr-code"
            />
          </div>
        </div>
      </div>

      <div className="action-row">
        <button className="hud-btn-secondary" style={{ flex: 1 }} onClick={handleHome}>
          Return Home
        </button>
        <button className="hud-btn-primary" style={{ flex: 1 }} onClick={handleDownload}>
          Download PDF
        </button>
      </div>
    </motion.div>
  );
}
