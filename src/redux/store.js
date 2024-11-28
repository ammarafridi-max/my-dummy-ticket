import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ticketFormReducer from "./slices/ticketFormSlice";
import flightReducer from "./slices/fetchFlights";
import selectedFlightReducer from "./slices/selectFlightSlice";
import formDetailsReducer from "./slices/fetchTicketDetails";
import createTicketReducer from "./slices/createTicket";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ticketForm", "flights", "formDetails"],
};

const rootReducer = combineReducers({
  ticketForm: ticketFormReducer,
  flights: flightReducer,
  flight: selectedFlightReducer,
  formDetails: formDetailsReducer,
  createTicket: createTicketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
