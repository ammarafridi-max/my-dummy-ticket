import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../config';

export const fetchFormDetails = createAsyncThunk(
  'formDetails/fetchFormDetails',
  async (sessionId, thunkAPI) => {
    try {
      const res = await fetch(`${baseURL}/api/ticket/${sessionId}`);
      if (!res.ok) throw new Error('An error occurred');
      const data = await res.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const formDetailsSlice = createSlice({
  name: 'formDetails',
  initialState: {
    formDetails: null,
    ticketPrice: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFormDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formDetails = action.payload; // Match API response
        state.ticketPrice = action.payload?.ticketPrice || null; // Fallback to null
      })
      .addCase(fetchFormDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default formDetailsSlice.reducer;
