import { combineReducers, configureStore } from '@reduxjs/toolkit';
import availableFlightsReducer from './slices/flights';
import selectedFlightReducer from './slices/selectFlight';
import formDetailsReducer from './slices/fetchTicketDetails';
import createTicketReducer from './slices/createTicket';
import passengerDetailsReducer from './slices/passengerDetailsSlice';

const rootReducer = combineReducers({
  availableFlights: availableFlightsReducer,
  flight: selectedFlightReducer,
  formDetails: formDetailsReducer,
  createTicket: createTicketReducer,
  passengerDetails: passengerDetailsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
