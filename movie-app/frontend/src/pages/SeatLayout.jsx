import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'

const ROWS = 'ABCDEFGH'.split(''), COLS = 12, AISLE = 6
const FOOD = [{ n: 'Popcorn', p: 220 }, { n: 'Samosa', p: 80 }, { n: 'Coke', p: 120 }]
const PRICE = 250
const session = (() => { let s = sessionStorage.getItem('sid'); if (!s) { s = crypto.randomUUID(); sessionStorage.setItem('sid', s) } return s })()

export default function SeatLayout() {
  const { id } = useParams()
  const [state, setState] = useState({ booked: [], locked: [] })
  const [sel, setSel] = useState([]); const [cart, setCart] = useState({})
  const [msg, setMsg] = useState(''); const [ticket, setTicket] = useState(null); const [phone, setPhone] = useState('')

  const refresh = useCallback(() => fetch(`/api/movies/${id}/seats`).then(r => r.json()).then(setState), [id])
  useEffect(() => { refresh(); const t = setInterval(refresh, 3000); return () => clearInterval(t) }, [refresh]) // polling = "real-time"; swap for WebSocket later

  const post = (path, body) => fetch(`/api/movies/${id}/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

  const toggle = async seat => {
    if (state.booked.includes(seat) || (state.locked.includes(seat) && !sel.includes(seat))) return
    if (sel.includes(seat)) { await post('seats/release', { seats: [seat], sessionId: session }); setSel(sel.filter(s => s !== seat)) }
    else { const r = await post('seats/lock', { seats: [seat], sessionId: session }); if (r.ok) setSel([...sel, seat]); else setMsg((await r.json()).error) }
    refresh()
  }
  const total = useMemo(() => sel.length * PRICE + FOOD.reduce((a, f) => a + (cart[f.n] || 0) * f.p, 0), [sel, cart])
  const foodStr = Object.entries(cart).filter(([, q]) => q > 0).map(([k, q]) => `${k}x${q}`).join(',') + (sel.length ? ` -> ${sel.join('/')}` : '')

  const pay = async () => {
    const r = await post('bookings', { seats: sel, sessionId: session, food: foodStr, phone })
    const j = await r.json(); if (r.ok) setTicket(j); else setMsg(j.error)
  }
  const color = s => state.booked.includes(s) ? 'bg-red-900 cursor-not-allowed' : sel.includes(s) ? 'bg-amber-400 text-black' : state.locked.includes(s) ? 'bg-slate-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-400'

  if (ticket) return <div className="p-10 text-center"><h2 className="text-3xl font-black text-emerald-400">Booking Confirmed</h2><p className="my-2">Ticket {ticket.ticketCode} · Seats {ticket.seats.join(', ')}</p><p className="text-slate-400">(Mock) PDF ticket sent via WhatsApp to {phone || 'your number'}.</p></div>

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* curved screen + 3D tilted seat plane */}
      <div className="mx-auto w-3/4 h-10 border-t-8 border-amber-300 rounded-[50%] shadow-[0_-20px_40px_rgba(252,211,77,.4)]" />
      <p className="text-center text-xs text-slate-400 mb-4">SCREEN</p>
      <div className="stage"><div className="tilt grid gap-2 justify-center">
        {ROWS.map(r => <div key={r} className="flex gap-2 justify-center">{Array.from({ length: COLS }, (_, i) => {
          const s = `${r}${i + 1}`
          return <div key={s} className="flex"><button onClick={() => toggle(s)} className={`w-8 h-8 rounded-t-lg text-[10px] font-bold transition ${color(s)}`}>{s}</button>{i + 1 === AISLE && <div className="w-6" />}</div>
        })}</div>)}
      </div></div>
      <div className="flex justify-between text-xs mt-6 text-slate-400"><span>⬅ EXIT</span><span>Legend: green free · yellow yours · grey held · red sold</span><span>EXIT ➡</span></div>
      {msg && <p className="text-red-400 mt-2">{msg}</p>}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="glass rounded-2xl p-5"><h3 className="font-bold mb-3">Delivered to your seat {sel[0] || ''}</h3>
          {FOOD.map(f => <div key={f.n} className="flex justify-between items-center my-2"><span>{f.n} · ₹{f.p}</span>
            <span><button onClick={() => setCart({ ...cart, [f.n]: Math.max(0, (cart[f.n] || 0) - 1) })} className="px-2">−</button>{cart[f.n] || 0}<button onClick={() => setCart({ ...cart, [f.n]: (cart[f.n] || 0) + 1 })} className="px-2">+</button></span></div>)}</div>
        <div className="glass rounded-2xl p-5"><h3 className="font-bold mb-2">Pay via UPI · ₹{total}</h3>
          {sel.length > 0 && <div className="bg-white p-2 inline-block rounded"><QRCodeSVG value={`upi://pay?pa=demo@upi&pn=CineMax&am=${total}&cu=INR`} size={120} /></div>}
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="WhatsApp number" className="block w-full bg-white/10 rounded px-3 py-2 my-3" />
          <button disabled={!sel.length} onClick={pay} className="w-full bg-amber-400 text-black font-bold py-3 rounded-full disabled:opacity-40">I've paid · Confirm</button>
          <p className="text-[10px] text-slate-400 mt-2">UPI payment is a mock; no payment is verified.</p></div>
      </div>
    </main>)
}
