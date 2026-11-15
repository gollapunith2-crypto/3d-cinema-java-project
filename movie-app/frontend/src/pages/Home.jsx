import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Poster from '../Poster.jsx'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [q, setQ] = useState('')
  const [hover, setHover] = useState(null)
  useEffect(() => { fetch('/api/movies').then(r => r.json()).then(setMovies) }, [])

  // AI "vibe" filter: backend maps free text to films
  const search = async e => {
    e.preventDefault()
    const url = q.trim() ? `/api/movies/vibe?q=${encodeURIComponent(q)}` : '/api/movies'
    setMovies(await (await fetch(url)).json())
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl md:text-6xl font-black mb-2">Upcoming Blockbusters</h1>
      <form onSubmit={search} className="glass rounded-full flex my-6 overflow-hidden">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder='Try: "I want a high-energy mass movie"'
          className="flex-1 bg-transparent px-6 py-3 outline-none" />
        <button className="px-6 bg-amber-400 text-black font-bold">Find my vibe</button>
      </form>
      {movies.length === 0 && <p className="text-slate-400">No match. Try another vibe.</p>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map(m => (
          <Link key={m.id} to={`/movie/${m.id}`} onMouseEnter={() => setHover(m.id)} onMouseLeave={() => setHover(null)}>
            <motion.div whileHover={{ scale: 1.06, y: -8 }} transition={{ type: 'spring', stiffness: 250 }}
              className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
              {/* blurred looping video appears on hover when videoUrl is set */}
              {hover === m.id && m.videoUrl && <video src={m.videoUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover blur-sm" />}
              <Poster movie={m} className={hover === m.id && m.videoUrl ? 'opacity-30' : ''} />
              <div className="glass absolute bottom-0 inset-x-0 p-3"><div className="font-bold">{m.title}</div><div className="text-xs text-slate-300">{m.genre}</div></div>
            </motion.div>
          </Link>))}
      </div>
    </main>)
}
