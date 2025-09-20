import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ticketFormSlice from './slices/ticketFormSlice';

const rootReducer = combineReducers({
  ticketForm: ticketFormSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
