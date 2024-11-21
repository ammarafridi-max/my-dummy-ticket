import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../config";

// GET FLIGHT DETAILS (booking/select-flights)

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (sessionId) => {
    try {
      const response = await axios.get(`${baseURL}/api/flights/fetchFlights`, {
        headers: {
          "X-Session-ID": sessionId,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to load flights"
      );
    }
  }
);

const flightSlice = createSlice({
  name: "flights",
  initialState: {
    flights: [],
    session: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.flights = action.payload.flights;
        state.session = action.payload.session;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default flightSlice.reducer;
