# mdt-frontend — Product + Technical Overview

This document summarizes the `mdt-frontend` application: tech stack, architecture, the user flows for dummy ticket issuance and travel insurance issuance, and the product view from conversion, SEO, and UX perspectives.

Sources are code-level observations from the current repository.

---

## 1) Tech Stack

**Framework and runtime**
- React 18 + React Router 7 (`react`, `react-dom`, `react-router-dom`)
- Vite 6 (`vite`, `@vitejs/plugin-react`)
- Tailwind CSS v4 via Vite plugin (`tailwindcss`, `@tailwindcss/vite`)

**State & data**
- React context for app-wide state (`TicketContext`, `InsuranceContext`)
- React Query (`@tanstack/react-query`) for API reads/mutations

**Styling and UI**
- Tailwind + utility classes in JSX
- Some `styled-components` in insurance payment page
- Icon libraries: `lucide-react`, `react-icons`
- `swiper` for carousels

**Analytics & SEO**
- GA4 via `react-ga4`
- `react-helmet-async` for head management
- JSON‑LD schema generators in `src/lib/schema.js`
- `sitemap.xml` and `public/robots.txt`

**Other utilities**
- `date-fns` for date formatting
- `axios` present but not primary (fetch wrapper used)
- `react-hot-toast` for user feedback

**Environment**
- `VITE_BACKEND_URL` for API base
- `VITE_VIEWTRIP_BACKEND` (unused in current frontend flows)
- `VITE_GA4_MEASUREMENT_ID`

Key files:
- `src/config.js`
- `src/lib/analytics.js`
- `src/lib/schema.js`

---

## 2) App Structure and Routing

Routes are configured in `src/app/AppRoutes.jsx` and are now lazy-loaded for performance. Primary routes include:

**Main site**
- `/` (Home)
- `/dummy-ticket-schengen-visa`
- `/dummy-ticket-us-visa`
- `/emirates-dummy-ticket`
- `/etihad-dummy-ticket`
- `/onward-ticket`
- `/travel-insurance`
- `/blog`, `/blog/:slug`
- `/faq`
- `/terms-and-conditions`, `/privacy-policy`

**Dummy ticket booking funnel**
- `/booking/select-flights`
- `/booking/review-details`
- `/payment-successful`

**Travel insurance funnel**
- `/travel-insurance/quotes`
- `/travel-insurance/passenger-details`
- `/travel-insurance/payment`

Key layouts:
- `AppLayout`, `BookingLayout`, `InsuranceBookingLayout`, and `AppLayout2`

---

## 3) Backend Integration

All API calls go through `src/services/apiClient.js`, which uses `fetch` with `credentials: 'include'` (cookies) and the `VITE_BACKEND_URL` base.

### Dummy Ticket APIs
- `POST /api/ticket` → create a dummy ticket (`createDummyTicketApi`)
- `POST /api/ticket/checkout` → get Stripe payment URL (`getStripePaymentURL`)
  - Requires `X-Session-ID` header (stored in localStorage)
- `GET /api/ticket/:sessionId` → get dummy ticket details

### Travel Insurance APIs
- `POST /api/insurance/quote` → get quotes
- `POST /api/insurance/finalize` → create insurance application, returns `paymentUrl`
- `GET /api/insurance/:sessionId` → application status
- `GET /api/insurance/documents/:policyId` → document list

Key files:
- `src/services/apiTickets.js`
- `src/services/apiInsurance.js`

---

## 4) Dummy Ticket Issuance Flow (Product + Technical)

### User journey (funnel)
1. **Landing page** `/` or targeted visa pages
   - Hero section renders `AllForms` (dummy ticket tab by default)
2. **Search flights** (TicketForm)
   - `TicketForm` validates inputs, triggers `trackFlightSearch`, then routes to `/booking/select-flights`
3. **Select a flight** `/booking/select-flights`
   - `useFlights` loads itineraries; `transformItinerary` shapes selected flight details
   - On selecting, stores departure/return flight details in `TicketContext`
4. **Review details** `/booking/review-details`
   - `useDummyTicket` loads ticket using `SESSION_ID`
   - user confirms, triggers `trackBeginCheckout` and `getStripePaymentURL` → browser redirect to Stripe
5. **Payment success** `/payment-successful?sessionId=...`
   - `useDummyTicket` fetches final ticket state
   - `trackPurchaseEvent` fires on success
   - user sees confirmation and can upsell to travel insurance

### Data + state involved
- `TicketContext` holds:
  - itinerary, passengers, pricing, delivery preference
  - contact details stored in localStorage
- `SESSION_ID` stored in localStorage after ticket creation (`useCreateDummyTicket`) and used for checkout and final ticket fetch

### Events tracked (GA4)
- `flight_search`
- `flight_form_submission`
- `begin_checkout`
- `purchase`

Key files:
- `src/components/TicketForm.jsx`
- `src/pages/booking-pages/SelectFlights.jsx`
- `src/pages/booking-pages/ReviewDetails.jsx`
- `src/pages/booking-pages/PaymentSuccess.jsx`
- `src/hooks/ticket/useCreateDummyTicket.js`
- `src/hooks/ticket/useStripePaymentURL.js`
- `src/hooks/ticket/useDummyTicket.js`

---

## 5) Travel Insurance Issuance Flow (Product + Technical)

### User journey (funnel)
1. **Landing page** `/travel-insurance` or upsell from payment success
   - Uses `AllForms` with insurance tab preset
2. **Get quotes** `/travel-insurance/quotes`
   - `useInsuranceQuotes` posts trip details to backend
   - user selects a plan
3. **Passenger details** `/travel-insurance/passenger-details`
   - collects per-passenger info (DOB, nationality, passport)
   - `useFinalizeInsurance` posts to backend → redirects to payment URL
4. **Payment status & documents** `/travel-insurance/payment?sessionId=...`
   - `useInsuranceApplication` validates payment status
   - `useInsuranceDocuments` fetches policy documents

### Data + state involved
- `InsuranceContext` holds trip details, passengers, contact info, and quote IDs
- Travel insurance data is persisted in localStorage (`travelInsurance`) between steps

Key files:
- `src/pages/travel-insurance/TravelInsurance.jsx`
- `src/pages/travel-insurance/Quotes.jsx`
- `src/pages/travel-insurance/PassengerDetails.jsx`
- `src/pages/travel-insurance/InsurancePayment.jsx`
- `src/hooks/insurance/*`

---

## 6) Conversion Rate Perspective

### Core funnel structure
**Dummy Ticket Funnel**
- Landing page → Flight search → Flight selection → Review details → Stripe checkout → Payment success

**Travel Insurance Funnel**
- Landing page → Quotes → Passenger details → Payment → Document delivery

### What’s already in place
- GA4 events for critical steps (`flight_search`, `begin_checkout`, `purchase`)
- Progressive forms split into smaller steps
- Upsell from dummy ticket success to travel insurance
- Clear pricing steps (ticket validity affects price)

### Conversion risks and friction points
- `SESSION_ID` stored in localStorage; if cleared between steps, checkout fails
- `ReviewDetails` requires data from backend (potential latency)
- Stripe redirect breaks flow context (common drop point)
- Travel insurance flow requires multiple forms and long data entry
- Error handling is minimal on payment failures beyond message + support email

### Opportunities
- Save progress banner when localStorage present
- Add stronger exit intent / reassurance on review and payment steps
- Clarify PNR verification and delivery timeline inline during checkout
- On mobile, consider reducing data entry friction in passenger forms

---

## 7) SEO Perspective

### Structured data and metadata
- JSON‑LD graphs (`Organization`, `Website`, `WebPage`, `FAQPage`, `BlogPosting`, `Service`)
- Canonical URLs and meta descriptions for major pages
- Blog pages have individual schema and canonical

Key files:
- `src/lib/schema.js`
- Page-level `Helmet` usage in `Home`, `Blog`, `BlogPost`, legal pages, travel insurance

### Crawl management
- `public/robots.txt`
- `sitemap.xml`
- Some pages marked `noindex, nofollow` (booking flow, insurance payment, quotes)

### SEO strengths
- Multiple long‑tail landing pages for visa variants
- FAQ pages with structured FAQ schema
- Blog for content expansion

### SEO gaps / risks
- Inconsistent schema `SITE_URL` is hardcoded to `mydummyticket.ae` (if site moves, schema must be updated)
- Some transactional pages use `robots: none` which is good, but ensure canonical paths are correct
- Blog content relies on client-side fetch; ensure SSR isn’t needed for indexing (current setup is CSR)

---

## 8) UX Perspective

### What’s strong
- Step-based flows keep cognitive load manageable
- Clear validation with inline toasts
- Consistent UI patterns and typography
- Clear confirmation states after payment

### UX friction points
- Heavy multi-step data entry for travel insurance (passport, DOB, nationality)
- No saved progress indicators for partially filled forms
- Some pages are long (multiple sections, FAQs, blog) and can feel dense on mobile

### Opportunities
- Add “Resume booking” prompts when localStorage data exists
- Autofill for passenger details (e.g., copy from primary passenger)
- Use progressive disclosure in forms
- Provide clearer expectations about delivery: PNR timing, email delivery, and ticket validity

---

## 9) Performance Notes (Relevant to UX + Conversion)

- Pages are now lazily loaded to reduce initial JS payload
- Heavy sections on Home are lazy loaded
- Swiper CSS scoped to its components
- GA initialized on idle

This helps improve LCP and TTI on mobile, which directly correlates with conversion.

---

## 10) What You Might Be Missing (Business + Product)

### Trust & compliance
- Add explicit compliance messaging near checkout (what “verifiable PNR” means)
- More proof points (logos, trust badges, reviews) near CTA and on review page

### Payment clarity
- Show final pricing earlier (e.g., before review page)
- Add “What happens after payment” checklist

### Funnel visibility
- No clear funnel metrics beyond GA4 events; consider:
  - track step completion (`select_flight`, `review_loaded`, `stripe_redirect`)
  - track drop-off on payment return

### Retention
- Follow-up email or on-site CTA for repeat purchase (not in frontend, but messaging can be added)

---

## 11) Quick Reference: Key Files

**Routing**
- `src/app/AppRoutes.jsx`

**Analytics**
- `src/lib/analytics.js`

**Contexts**
- `src/context/TicketContext.jsx`
- `src/context/InsuranceContext.jsx`

**Dummy Ticket Flow**
- `src/components/TicketForm.jsx`
- `src/pages/booking-pages/SelectFlights.jsx`
- `src/pages/booking-pages/ReviewDetails.jsx`
- `src/pages/booking-pages/PaymentSuccess.jsx`
- `src/hooks/ticket/*`
- `src/services/apiTickets.js`

**Travel Insurance Flow**
- `src/components/TravelInsuranceForm.jsx`
- `src/pages/travel-insurance/*`
- `src/hooks/insurance/*`
- `src/services/apiInsurance.js`

**SEO + Schema**
- `src/lib/schema.js`
- `src/pages/*` (Helmet usage)
- `public/robots.txt`
- `sitemap.xml`

---

## 12) Assumptions and Non-Goals

- Backend behavior is inferred from frontend API usage
- No server-side rendering in this frontend (CSR only)
- Stripe payment flow happens off-site and returns to `payment-successful` or insurance payment page

