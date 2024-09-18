import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localBaseURL } from "../../config";

const initialState = {
  airports: [],
  isLoading: false,
  error: null,
};

export const fetchAirports = createAsyncThunk(
  "airports/fetchAirports",
  async (query) => {
    const response = await axios.get(
      `${localBaseURL}/api/airports?keyword=${query}`
    );
    return response.data.result;
  }
);

const airportsSlice = createSlice({
  name: "airports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAirports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.airports = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAirports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default airportsSlice.reducer;
