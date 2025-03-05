import { createSlice } from '@reduxjs/toolkit';

// This redux handles state that is submitted at the Dummy Ticket
// form on the home page. This does not send any data to backend.
// The data stored here is used by SelectFlights page to fetch flights
// based on the data provided here.

const initialState = {
  type: 'One Way',
  from: '',
  to: '',
  departureDate: '',
  returnDate: '',
  quantity: {
    adults: 1,
    children: 0,
    infants: 0,
  },
};

const ticketFormSlice = createSlice({
  name: 'ticketForm',
  initialState: {
    formData: initialState,
  },
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    updateQuantity: (state, action) => {
      state.formData.quantity = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialState;
    },
  },
});

export const { updateFormField, updateQuantity, resetForm } = ticketFormSlice.actions;

export default ticketFormSlice.reducer;
