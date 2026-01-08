import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND } from '../../config';
import { formatISODuration } from '../../utils/formatISODuration';
import { trackFlightFormSubmission } from '../../lib/analytics';

const routes = JSON.parse(localStorage.getItem('routes'));
const email = localStorage.getItem('email') || '';
const phoneNumber = JSON.parse(localStorage.getItem('phoneNumber')) || {
  code: '',
  digits: '',
};

const initialState = {
  loading: '',
  type: 'One Way',
  from: routes?.from || '',
  to: routes?.to || '',
  departureDate: '',
  returnDate: '',
  quantity: { adults: 1, children: 0, infants: 0 },
  ticketPrice: 13,
  passengers: [],
  email,
  phoneNumber,
  ticketValidity: '2 Days',
  receiveNow: true,
  deliveryDate: '',
  message: '',
  paymentStatus: 'UNPAID',
  departureFlight: '',
  returnFlight: '',
  passengerErrors: [],
  errorMessage: '',
  phoneNumberError: '',
};

// Slice
const ticketFormSlice = createSlice({
  name: 'ticketForm',
  initialState,
  reducers: {
    updateField: (state, { payload }) => {
      const { field, value } = payload;
      state[field] = value;
    },

    updatePassengerData: (state, { payload }) => {
      const { type, payload: data } = payload;

      switch (type) {
        case 'SET_ALL':
          state.passengers = data;
          break;

        case 'UPDATE_SINGLE':
          const { index, field, value } = data;
          state.passengers[index][field] = value;

          if (!state.passengerErrors[index]) {
            state.passengerErrors[index] = {};
          }

          if (['firstName', 'lastName'].includes(field)) {
            state.passengerErrors[index][field] = value.trim() ? '' : `${field} is required`;
          }
          break;

        case 'GENERATE_LIST':
          const newPassengers = [];
          [
            ['Adult', data.adults],
            ['Child', data.children],
            ['Infant', data.infants],
          ].forEach(([type, count]) => {
            for (let i = 0; i < count; i++) {
              newPassengers.push({
                type,
                title: 'Mr.',
                firstName: '',
                lastName: '',
              });
            }
          });
          state.passengers = newPassengers;
          break;
      }
    },

    updatePricing: (state, { payload }) => {
      const { ticketValidity, ticketPrice } = payload;
      state.ticketValidity = ticketValidity;
      state.ticketPrice = ticketPrice;
    },

    updateValidation: (state, { payload }) => {
      const { type, payload: data } = payload;

      switch (type) {
        case 'PASSENGER_ERRORS':
          state.passengerErrors = data;
          break;

        case 'ERROR_MESSAGE':
          state.errorMessage = data;
          break;

        case 'PHONE_ERROR':
          state.phoneNumberError = data;
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
          return errors.every(err => !Object.values(err).some(Boolean));
      }
    },

    validateForm: state => {
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

      const phoneValid = state.phoneNumber.code && state.phoneNumber.digits;
      state.phoneNumberError = phoneValid ? '' : 'Phone number is required';

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
      state.errorMessage = emailValid ? '' : 'Valid email is required';
    },

    resetForm: () => ({ ...initialState }),
  },
  extraReducers: builder => {
    builder
      .addCase(submitFormData.pending, state => {
        state.loading = true;
      })
      .addCase(submitFormData.fulfilled, state => {
        state.loading = false;
      })
      .addCase(submitFormData.rejected, state => {
        state.loading = false;
      });
  },
});

// Thunks
export const submitFormData = createAsyncThunk(
  'ticketForm/submitFormData',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    dispatch(validateForm());

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
      paymentStatus,
      departureFlight,
      returnFlight,
      ticketValidity,
      receiveNow,
      deliveryDate,
    } = state.ticketForm;

    const payload = {
      type,
      from,
      to,
      departureDate,
      returnDate: returnDate || null,
      quantity,
      passengers,
      email,
      phoneNumber,
      message,
      paymentStatus,
      ticketValidity,
      ticketDelivery: {
        immediate: receiveNow,
        deliveryDate: receiveNow ? null : deliveryDate,
      },
      flightDetails: {
        departureFlight,
        returnFlight: returnFlight || null,
      },
    };

    try {
      trackFlightFormSubmission({
        passengers: payload.passengers,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        ticketValidity: payload.ticketValidity,
        flightDetails: {
          departureFlight: payload.flightDetails?.departureFlight,
          returnFlight: payload.flightDetails?.returnFlight || null,
        },
      });
      const res = await fetch(`${BACKEND}/api/ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      localStorage.setItem('SESSION_ID', data.sessionId);
      return data;
    } catch (error) {
      console.error('Submission error:', error);
      return rejectWithValue('Failed to create the ticket. Please try again.');
    }
  }
);

export const initializePassengers = createAsyncThunk(
  'ticketForm/initializePassengers',
  async (_, { getState, dispatch }) => {
    const quantity = getState().ticketForm.quantity;
    dispatch(updatePassengerData({ type: 'GENERATE_LIST', payload: quantity }));
  }
);

export function transformItinerary(itinerary) {
  return {
    duration: formatISODuration(itinerary.duration),
    segments: itinerary.segments.map(segment => ({
      departure: {
        iataCode: segment.departure.iataCode,
        date: segment.departure.at.split('T')[0],
        time: segment.departure.at.split('T')[1],
      },
      arrival: {
        iataCode: segment.arrival.iataCode,
        date: segment.arrival.at.split('T')[0],
        time: segment.arrival.at.split('T')[1],
      },
      duration: formatISODuration(segment.duration),
      carrierCode: segment.carrierCode,
      flightNumber: segment.number,
      aircraftCode: segment.aircraft?.code,
      airline: {
        name: segment.airlineDetail?.commonName || segment.airlineDetail?.businessName || '',
        logo: `${segment.airlineDetail?.logo}` || '',
      },
    })),
  };
}

// Actions
export const {
  updateField,
  updatePassengerData,
  updatePricing,
  updateValidation,
  resetForm,
  validateForm,
} = ticketFormSlice.actions;

export default ticketFormSlice.reducer;
