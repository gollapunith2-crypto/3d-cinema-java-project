import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Poster from '../Poster.jsx'
export default function MovieDetails() {
  const { id } = useParams(); const [m, setM] = useState(null)
  useEffect(() => { fetch(`/api/movies/${id}`).then(r => r.json()).then(setM) }, [id])
  if (!m) return <p className="p-10">Loading…</p>
  return (
    <motion.main initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto p-6 grid md:grid-cols-[320px_1fr] gap-8">
      <div className="aspect-[2/3] rounded-2xl overflow-hidden"><Poster movie={m} /></div>
      <div className="glass rounded-2xl p-8">
        <h1 className="text-5xl font-black">{m.title}</h1>
        <p className="text-amber-400 my-2">{m.language} · {m.genre}</p>
        <p className="text-slate-300 mb-8">{m.synopsis}</p>
        <Link to={`/movie/${m.id}/seats`} className="inline-block bg-amber-400 text-black font-bold px-8 py-3 rounded-full">Book Tickets</Link>
      </div>
    </motion.main>)
}
