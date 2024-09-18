import { configureStore } from "@reduxjs/toolkit";
import airportsReducer from "./slices/airportsSlice";
import ticketFormReducer from "./slices/ticketFormSlice";
import flightReducer from "./slices/fetchFlight";
import selectedFlightReducer from "./slices/selectFlightSlice";
import formDetailsReducer from "./slices/fetchReviewDetailsSlice";
import createTicketReducer from "./slices/createTicketSlice";

const store = configureStore({
  reducer: {
    airports: airportsReducer,
    ticketForm: ticketFormReducer,
    flights: flightReducer,
    flight: selectedFlightReducer,
    formDetails: formDetailsReducer,
    createTicket: createTicketReducer,
  },
});

export default store;
