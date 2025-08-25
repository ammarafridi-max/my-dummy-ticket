import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../../config';
import axios from 'axios';

export const createStipePaymentLink = createAsyncThunk(
  'payment/createStipePaymentLink',
  async (ticketDetails, { rejectWithValue }) => {
    try {
      const sessionId = localStorage.getItem('SESSION_ID');

      if (!sessionId) {
        return rejectWithValue(
          'Session ID is missing. Please restart the process.'
        );
      }

      const response = await axios.post(
        `${BASEURL}/api/ticket/buy-ticket`,
        ticketDetails,
        {
          headers: {
            'X-Session-ID': sessionId,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'An unexpected error occurred.'
      );
    }
  }
);

const stripePayment = createSlice({
  name: 'payment',
  initialState: {
    stripeStatus: 'idle',
    data: null,
    stripeError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStipePaymentLink.pending, (state) => {
        state.stripeStatus = 'loading';
        state.stripeError = null;
      })
      .addCase(createStipePaymentLink.fulfilled, (state, action) => {
        state.stripeStatus = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createStipePaymentLink.rejected, (state, action) => {
        state.stripeStatus = 'failed';
        state.stripeError = action.payload;
      });
  },
});

export default stripePayment.reducer;
