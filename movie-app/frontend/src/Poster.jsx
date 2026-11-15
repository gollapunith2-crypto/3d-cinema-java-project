import { useState } from 'react'
/** Real <img>; if the file is missing, falls back to a title card so the layout never breaks. */
export default function Poster({ movie, className = '' }) {
  const [ok, setOk] = useState(true)
  return ok
    ? <img src={movie.posterUrl} alt={`${movie.title} poster`} onError={() => setOk(false)} className={`w-full h-full object-cover ${className}`} />
    : <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-fuchsia-700 to-indigo-900 text-3xl font-black p-4 text-center ${className}`}>{movie.title}</div>
}
