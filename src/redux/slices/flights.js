import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../config';

// This slice sends a request to the backend and fetches a list of flights
// based on the data provided in the ticketFormSlice.

const availableFlightsSlice = createSlice({
  name: 'availableFlights',
  initialState: {
    availableFlightsData: null,
    searchSessionId: null,
    searchStatus: 'idle',
    searchError: null,
  },
  reducers: {
    resetFlights: (state) => {
      state.availableFlightsData = null;
      state.searchSessionId = null;
      state.searchStatus = 'idle';
      state.searchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableFlights.pending, (state) => {
        state.searchStatus = 'loading';
        state.searchError = null;
      })
      .addCase(fetchAvailableFlights.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.availableFlightsData = action.payload.flights;
      })
      .addCase(fetchAvailableFlights.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.searchError = action.error.message;
      });
  },
});

export const fetchAvailableFlights = createAsyncThunk(
  'availableFlights/fetchAvailableFlights',
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
    return response.json(); // Assuming the API response contains `flights` data
  }
);

export const { resetFlights } = availableFlightsSlice.actions;

export default availableFlightsSlice.reducer;
