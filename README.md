# MDT Frontend

Public-facing site for My Dummy Ticket (landing pages, booking flow, blog, and travel insurance).

## Stack
- Vite + React
- React Router
- TanStack Query
- Tailwind CSS

## Setup
1. Install dependencies:
   - `npm install`
2. Run the dev server:
   - `npm run dev`

## Environment Variables
Create a `.env` file in `mdt-frontend/`:
- `VITE_BACKEND_URL` — backend base URL
- `VITE_VIEWTRIP_BACKEND` — ViewTrip backend (if used)
- `VITE_GA4_MEASUREMENT_ID` — GA4 measurement ID

## Scripts
- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — lint

