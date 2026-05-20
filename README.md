# FundScout

## Live URLs

Frontend: 
https://fundscout-live.vercel.app

Backend:
https://fundscout.onrender.com

---

## Overview

A full-stack MERN application that allows users to:

- Search Indian Mutual Funds
- Add/remove funds from a persistent watchlist
- View historical NAV performance charts
- Filter NAV charts by:
  - 1Y
  - 3Y
  - 5Y
  - All

The application uses the public MFAPI.in API for mutual fund data.

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- shadcn/ui
- Recharts
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/sujalsoni19/fundscout.git
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env` file inside backend folder

Add the following variables:

```env
PORT=5000

MONGODB_URI=your_mongodb_atlas_connection_string
DB_NAME=your_db_name

CORS_ORIGIN=http://localhost:5173(your frontend url)
```

## Start backend server

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Create `.env` file inside frontend folder

Add:

```env
VITE_API_BASE_URL=http://localhost:5000(your backend url)
```

## Start frontend server

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

# Features

- Debounced mutual fund search
- Persistent MongoDB watchlist
- Duplicate prevention for watchlist items
- Historical NAV chart visualization
- Time range filters
- Loading and error state handling

---

# API Endpoints

## Watchlist

### Get all watchlist items

```http
GET /api/watchlist
```

### Add item to watchlist

```http
POST /api/watchlist
```

### Remove item from watchlist

```http
DELETE /api/watchlist/:schemeCode
```

---

## Fund Details

### Get historical NAV data

```http
GET /api/funds/:schemeCode
```

---

# Deployment Notes

- Frontend deployed on Vercel
- Backend deployed on Render
- MongoDB Atlas used for database
- Environment variables configured on deployment platforms
- CORS configured for deployed frontend origin

---

# Assumptions

- Single shared watchlist for all users
- No authentication implemented
- MFAPI.in service availability assumed

---

# Known Limitations

- Some MFAPI schemes may contain outdated or incomplete NAV history
- No pagination implemented for search results
- No backend caching implemented for NAV responses

---

# Author

Sujal Soni
