# 🍿 3D Cinema Movie Booking App

A full-stack movie booking application featuring an immersive 3D WebGL theater view. Book seats and watch real YouTube trailers projected directly onto a virtual cinema screen that syncs with interactive 3D curtains.

## ✨ Key Features

* **Interactive 3D Theater:** Navigate a virtual cinema room built with Three.js.
* **Cinematic Trailer Projection:** YouTube trailers are flawlessly mapped to the 3D screen using advanced CSS3D matrix transformations.
* **Curtain Sync Logic:** Trailers automatically load and play from 0:00 when the virtual curtains open, and pause when closed.
* **Smart State Management:** Seamlessly handles React state alongside legacy 3D canvas rendering without frame drops.
* **Full-Stack Architecture:** Clean separation of concerns with a React frontend and a robust Spring Boot Java backend.

## 🚀 Tech Stack

**Frontend:**
* React.js
* Three.js (WebGL)
* CSS 3D Projection
* Vite

**Backend:**
* Java
* Spring Boot
* Maven

## 🛠️ Local Setup & Installation

Ensure you have **Node.js** and **Java (JDK 17 or higher)** installed on your machine before starting.

### 1. Start the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
./mvnw spring-boot:run
```
(The backend will typically run on http://localhost:8080)

### 2. Start the Frontend
Open a new, separate terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```
(The frontend will typically run on http://localhost:5173)

## 📁 Repository Structure

```
📦 3d-cinema-java-project
 ┣ 📂 backend/       # Spring Boot Java application (APIs, Models, Config)
 ┣ 📂 frontend/      # React application (UI, Three.js canvas, Components)
 ┗ 📜 README.md
```

## 💡 Usage

Browse the list of currently showing or upcoming movies.

Select a movie and enter the 3D theater view.

Click Open Curtains to trigger the immersive YouTube trailer playback.

Select your preferred seats from the 3D layout and proceed to checkout.
