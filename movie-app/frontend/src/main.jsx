import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <header className="glass sticky top-0 z-20 px-6 py-3"><Link to="/" className="text-2xl font-black tracking-widest text-amber-400">CINEMAX</Link></header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/movie/:id/seats" element={<SeatLayout />} />
    </Routes>
  </BrowserRouter>)
