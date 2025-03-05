import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../config';

export const createTicket = createAsyncThunk(
  'createTicket/createTicket',
  async (ticketDetails, { rejectWithValue }) => {
    try {
      const sessionId = localStorage.getItem('SESSION_ID');
      if (!sessionId) {
        return rejectWithValue('Session ID is missing. Please restart the process.');
      }
      const response = await axios.post(`${baseURL}/api/ticket/buy-ticket`, ticketDetails, {
        headers: {
          'X-Session-ID': sessionId,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An unexpected error occurred.');
    }
  }
);

const createTicketSlice = createSlice({
  name: 'createTicket',
  initialState: {
    stripeStatus: 'idle',
    data: null,
    stripeError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.stripeStatus = 'loading';
        state.stripeError = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.stripeStatus = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.stripeStatus = 'failed';
        state.stripeError = action.payload;
      });
  },
});

export default createTicketSlice.reducer;
