import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ticketFormReducer from './slices/ticketForm';
import flightReducer from './slices/fetchFlights';
import selectedFlightReducer from './slices/selectFlight';
import formDetailsReducer from './slices/fetchTicketDetails';
import createTicketReducer from './slices/createTicket';

const rootReducer = combineReducers({
  ticketForm: ticketFormReducer,
  flights: flightReducer,
  flight: selectedFlightReducer,
  formDetails: formDetailsReducer,
  createTicket: createTicketReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
