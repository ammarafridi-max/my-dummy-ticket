import { combineReducers, configureStore } from '@reduxjs/toolkit';
import flightsSlice from './slices/flights';
import formDetailsReducer from './slices/fetchTicketDetails';
import stripePaymentReducer from './slices/stripePayment';
import ticketFormSlice from './slices/ticketFormSlice';

const rootReducer = combineReducers({
  flights: flightsSlice,
  ticketForm: ticketFormSlice,
  formDetails: formDetailsReducer,
  payment: stripePaymentReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
