import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../config';

// const initialState = {
//   type: '',
//   from: '',
//   to: '',
//   departureDate: '',
//   returnDate: '',
//   quantity: { adults: 1, children: 0, infants: 0 },
//   passengers: [],
//   email: '',
//   phoneNumber: '',
//   message: '',
//   flightDetails: { departureFlight: '', returnFlight: '' },
//   status: 'REVIEW_ORDER',
//   tickeValidity: '48 Hours',
//   ticketAvailability: {
//     immediate: true,
//     receiptDate: null,
//   },
//   totalAmount: 0,
// };

export const updateFlightDetails = createAsyncThunk(
  'flight/updateFlightDetails',
  async ({ sessionId, flightData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/ticket/updateFormDetails`,
        { flightData },
        {
          headers: {
            'X-Session-ID': sessionId,
          },
        }
      );
      if (response.status === 200) {
        return { data: response.data, status: response.status };
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

const flightSlice = createSlice({
  name: 'flight',
  initialState: {
    flightData: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateFlightDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateFlightDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flightData = action.payload.data;
      })
      .addCase(updateFlightDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectFlightError = (state) => state.flight.error;
export const selectFlightStatus = (state) => state.flight.status;

export default flightSlice.reducer;
