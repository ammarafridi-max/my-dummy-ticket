import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../config';

const routes = JSON.parse(localStorage.getItem('routes'));

const initialState = {
  type: 'One Way',
  from: routes?.from || '',
  to: routes?.to || '',
  departureDate: '',
  returnDate: '',
  quantity: { adults: 1, children: 0, infants: 0 },
  ticketPrice: 12,
  passengers: [],
  email: localStorage.getItem('email') || '',
  phoneNumber: JSON.parse(localStorage.getItem('phoneNumber')) || {
    code: '',
    digits: '',
  },
  ticketValidity: '48 Hours',
  receiveNow: true,
  receiptDate: '',
  message: '',
  status: 'REVIEW_ORDER',
  departureFlight: '',
  returnFlight: '',
  totalAmount: 12,
  passengerErrors: [],
  errorMessage: '',
  phoneNumberError: '',
};

export const passengerDetailsSlice = createSlice({
  name: 'passengerDetails',
  initialState,
  reducers: {
    // Generic field updater for simple fields
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    // Handle all passenger-related updates
    updatePassengerData: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case 'SET_ALL':
          state.passengers = payload;
          break;
        case 'UPDATE_SINGLE':
          const { index, field, value } = payload;
          state.passengers[index][field] = value;
          if (!state.passengerErrors[index]) {
            state.passengerErrors[index] = {};
          }
          if (field === 'firstName' || field === 'lastName') {
            state.passengerErrors[index] = {
              ...state.passengerErrors[index],
              [field]: value.trim() ? '' : `${field} is required`,
            };
          }
          break;
        case 'GENERATE_LIST':
          const passengers = [];
          [
            ['Adult', payload.adults],
            ['Child', payload.children],
            ['Infant', payload.infants],
          ].forEach(([type, count]) => {
            for (let i = 0; i < count; i++) {
              passengers.push({
                type,
                title: 'Mr.',
                firstName: '',
                lastName: '',
              });
            }
          });
          state.passengers = passengers;
          break;
      }
    },

    // Handle all price and amount calculations
    updatePricing: (state, action) => {
      const { type, validity } = action.payload;
      switch (type) {
        case 'SET_VALIDITY':
          state.ticketValidity = validity;
          state.ticketPrice =
            validity === '7 Days' ? 19 : validity === '14 Days' ? 22 : 12;
          break;
        case 'CALCULATE_TOTAL':
          state.totalAmount =
            state.ticketPrice *
            (state.quantity.adults + state.quantity.children);
          break;
        case 'SET_PRICE':
          state.ticketPrice = action.payload.price;
          break;
      }
    },

    // Handle all validation-related updates
    updateValidation: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case 'PASSENGER_ERRORS':
          state.passengerErrors = payload;
          break;
        case 'ERROR_MESSAGE':
          state.errorMessage = payload;
          break;
        case 'PHONE_ERROR':
          state.phoneNumberError = payload;
          break;
        case 'VALIDATE_PASSENGERS':
          const errors = state.passengers.map(({ firstName, lastName }) => ({
            firstName: firstName
              ? /^[A-Za-z\s]+$/.test(firstName.trim())
                ? ''
                : 'Only letters and spaces allowed'
              : 'First name required',
            lastName: lastName
              ? /^[A-Za-z\s]+$/.test(lastName.trim())
                ? ''
                : 'Only letters and spaces allowed'
              : 'Last name required',
          }));
          state.passengerErrors = errors;
          return errors.every((err) => !Object.values(err).some(Boolean));
      }
    },

    // Reset form to initial state
    resetForm: () => initialState,

    // Add form validation
    validateForm: (state) => {
      // Validate passengers
      const passengerValidation = state.passengers.map(
        ({ firstName, lastName }) => ({
          firstName: firstName
            ? /^[A-Za-z\s]+$/.test(firstName.trim())
              ? ''
              : 'Only letters and spaces allowed'
            : 'First name required',
          lastName: lastName
            ? /^[A-Za-z\s]+$/.test(lastName.trim())
              ? ''
              : 'Only letters and spaces allowed'
            : 'Last name required',
        })
      );

      state.passengerErrors = passengerValidation;

      // Validate phone number
      const phoneValid = state.phoneNumber.code && state.phoneNumber.digits;
      state.phoneNumberError = phoneValid ? '' : 'Phone number is required';

      // Validate email
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
      state.errorMessage = emailValid ? '' : 'Valid email is required';
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(calculateTotalAmount.fulfilled, (state, action) => {
  //     state.totalAmount = action.payload;
  //   });
  // },
});

export const {
  updateField,
  updatePassengerData,
  updatePricing,
  updateValidation,
  resetForm,
  validateForm,
} = passengerDetailsSlice.actions;

export const selectForm = (state) => state.passengerDetails;
export const selectPassengers = (state) => state.passengerDetails.passengers;
export const selectEmail = (state) => state.passengerDetails.email;
export const selectPhoneNumber = (state) => state.passengerDetails.phoneNumber;
export const selectTicketValidity = (state) =>
  state.passengerDetails.ticketValidity;
export const selectReceiveNow = (state) => state.passengerDetails.receiveNow;
export const selectReceiptDate = (state) => state.passengerDetails.receiptDate;
export const selectMessage = (state) => state.passengerDetails.message;
export const selectDepartureFlight = (state) =>
  state.passengerDetails.departureFlight;
export const selectReturnFlight = (state) =>
  state.passengerDetails.returnFlight;
export const selectTotalAmount = (state) => state.passengerDetails.totalAmount;
export const selectPassengerErrors = (state) =>
  state.passengerDetails.passengerErrors;
export const selectErrorMessage = (state) =>
  state.passengerDetails.errorMessage;
export const selectPhoneNumberError = (state) =>
  state.passengerDetails.phoneNumberError;
export const selectDummyPrice = (state) => state.passengerDetails.ticketPrice;
export const selectFormValidity = (state) => {
  const { passengerErrors, phoneNumberError, errorMessage } =
    state.passengerDetails;
  return (
    passengerErrors.every((err) => !Object.values(err).some(Boolean)) &&
    !phoneNumberError &&
    !errorMessage
  );
};

export default passengerDetailsSlice.reducer;

export const submitFormData = createAsyncThunk(
  'passengerDetails/submitFormData',
  async (formData, { getState, dispatch, rejectWithValue }) => {
    const state = getState();

    // Validate the form
    dispatch(passengerDetailsSlice.actions.validateForm());
    const isValid = selectFormValidity(state);

    if (!isValid) {
      return rejectWithValue('Validation failed');
    }

    const {
      type,
      from,
      to,
      departureDate,
      returnDate,
      quantity,
      passengers,
      email,
      phoneNumber,
      message,
      status,
      departureFlight,
      returnFlight,
      ticketValidity,
      receiveNow,
      receiptDate,
      ticketPrice,
      totalAmount,
    } = state.passengerDetails;

    const updatedFormData = {
      type,
      passengers,
      email,
      phoneNumber,
      message,
      from,
      to,
      flightDetails: { departureFlight, returnFlight: returnFlight || null },
      departureDate,
      returnDate: returnDate || null,
      quantity,
      status,
      ticketValidity,
      ticketAvailability: {
        immediate: receiveNow,
        receiptDate: !receiveNow ? receiptDate : null,
      },
      totalAmount: totalAmount,
    };

    console.log('Updated form: ', updatedFormData);

    try {
      const res = await fetch(`${baseURL}/api/ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      localStorage.setItem('SESSION_ID', data.sessionId);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return rejectWithValue('Failed to create the ticket. Please try again.');
    }
  }
);

// export const calculateTotalAmount = createAsyncThunk(
//   'form/calculateTotalAmount',
//   async (_, { getState }) => {
//     const state = getState();
//     const { ticketPrice, quantity } = state.form;
//     const totalPassengers = (quantity?.adults || 0) + (quantity?.children || 0);

//     const totalAmount = ticketPrice * totalPassengers;
//     return totalAmount;
//   }
// );

export const initializePassengers = createAsyncThunk(
  'passengerDetails/initializePassengers',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const quantity = state.passengerDetails.quantity;

    dispatch(
      updatePassengerData({
        type: 'GENERATE_LIST',
        payload: quantity,
      })
    );
  }
);
