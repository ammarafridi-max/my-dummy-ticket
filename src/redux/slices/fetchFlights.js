import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../config';

// This slice sends a request to the backend and fetches a list of flights
// based on the data provided in the ticketFormSlice.

export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (formData) => {
    const response = await fetch(`${baseURL}/api/flights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch flights');
    }
    return response.json();
  }
);

const flightsSlice = createSlice({
  name: 'flights',
  initialState: {
    flights: null,
    session: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetFlights: (state) => {
      state.flights = null;
      state.session = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flights = action.payload.flights;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetFlights } = flightsSlice.actions;
export default flightsSlice.reducer;
