import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movies from './pages/Movies';
import Theatres from './pages/Theatres';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/theatres" element={<Theatres />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
