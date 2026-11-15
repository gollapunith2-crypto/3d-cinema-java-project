# CineMax – Movie Reservation (Spring Boot 3 + React)
Backend: open `backend/` in IntelliJ, run `MovieAppApplication` (port 8080, Swagger at /swagger-ui.html, H2 by default).
Frontend: `cd frontend && npm install && npm run dev` (port 5173, proxies /api to 8080).
Posters: drop `varanasi.jpg, spirit.jpg, dragon.jpg, ssmb29.jpg` into `frontend/public/posters/`. Hover video: set `video_url` in data.sql.
Not implemented (stubbed/mocked): JWT auth, real UPI verification, real WhatsApp/PDF, WebSocket seat updates (uses 3s polling).
