# mdt-frontend — Product + Technical Overview

This document summarizes the current merged `mdt-frontend` codebase, which now contains both:
- client/public site
- admin application under `/admin/*`

All notes are based on the current repository structure and behavior.

---

## 1) Tech Stack

**Framework/runtime**
- React 18
- React Router 7
- Vite 6
- Tailwind CSS v4

**Data/state**
- TanStack Query for server state
- React Context for app state (`TicketContext`, `InsuranceContext`, `AuthContext`)

**UI/utilities**
- Shared components in `src/components`
- Shared hooks in `src/hooks`
- Shared services in `src/services`
- Shared utilities in `src/utils`
- `react-hot-toast`, `react-icons`, `lucide-react`, `styled-components`

**SEO/analytics**
- `react-helmet-async`
- GA4 integration in `src/lib/analytics.js`
- JSON-LD helpers in `src/lib/schema.js`

---

## 2) Unified Architecture

The project is a single frontend with two apps mounted from shared `src/App.jsx`:

- Client app: `src/client/**`
- Admin app: `src/admin/**`

Shared foundation (used by both where applicable):
- `src/main.jsx`
- `src/index.css`
- `src/config.js`
- `src/context/**`
- `src/components/**`
- `src/layouts/**`
- `src/lib/**`
- `src/services/**`
- `src/utils/**`
- `src/hooks/**`

`src/App.jsx` decides which app to render using the pathname:
- `/admin*` => admin router
- everything else => client router

This prevents router/layout overlap between admin and client.

---

## 3) Routing and Layout Boundaries

### Client routing
Defined in:
- `src/client/app/AppRoutes.jsx`

Uses client layouts:
- `AppLayout`
- `BookingLayout`
- `InsuranceBookingLayout`
- `AppLayout2`

### Admin routing
Defined in:
- `src/admin/app/AdminAppRoutes.jsx`

Admin router settings:
- `BrowserRouter basename="/admin"`
- routes resolve under `/admin/*`

Uses admin layout only:
- `AdminLayout` (`src/layouts/AdminLayout.jsx`)

Admin sidebar/nav:
- `AdminNavigation` (`src/components/AdminNavigation.jsx`)

Admin/auth guards:
- `ProtectedRoute`
- `AdminRoute`
- `AuthProvider` from shared `src/context/AuthContext.jsx`

---

## 4) Analytics Behavior

Analytics is initialized only for client paths.

In `src/App.jsx`:
- GA init is skipped when pathname starts with `/admin`

This ensures admin pages are not tracked by client analytics.

---

## 5) Styling Behavior

- Shared base styles live in `src/index.css`
- Admin routes explicitly import shared `src/index.css` in `src/admin/app/AdminAppRoutes.jsx`
- Client pages also use shared styles via app entry

Admin layout currently uses a fixed sidebar width (no drag-resize logic).

---

## 6) API Integration

Shared API base:
- `src/config.js` (`BACKEND`, `GA4_MEASUREMENT_ID`, `TINYMCE_API_KEY`, etc.)

Shared API wrapper:
- `src/services/apiClient.js`

Admin and client both consume shared services/config patterns.

---

## 7) Utility Consolidation

Duplicate Dubai date/time utilities were consolidated into:
- `src/utils/dubaiDateTime.js`

Exports:
- `convertToDubaiDate`
- `convertToDubaiTime`
- `formatMongoDBDate`

Removed duplicate files:
- `src/utils/dateFunctions.js`
- `src/utils/timeFunctions.js`
- `src/utils/formatMongoDBDate.js`

---

## 8) Key Paths (Current)

**Core entry**
- `src/main.jsx`
- `src/App.jsx`

**Client app**
- `src/client/app/AppRoutes.jsx`
- `src/client/pages/**`

**Admin app**
- `src/admin/app/AdminAppRoutes.jsx`
- `src/admin/features/**`

**Shared**
- `src/components/**`
- `src/layouts/**`
- `src/context/**`
- `src/hooks/**`
- `src/services/**`
- `src/utils/**`
- `src/lib/**`
- `src/config.js`
- `src/index.css`

---

## 9) Environment Variables

Required/used variables:
- `VITE_BACKEND_URL`
- `VITE_GA4_MEASUREMENT_ID`
- `VITE_TINYMCE_API_KEY` (used by editor features)
- `VITE_VIEWTRIP_BACKEND` (if feature paths depend on it)

---

## 10) Commands

From `mdt-frontend/`:
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
