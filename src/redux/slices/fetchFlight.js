import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localBaseURL } from "../../config";

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (sessionId) => {
    try {
      const response = await axios.get(
        `${localBaseURL}/api/flights/fetchFlights`,
        {
          headers: {
            "X-Session-ID": sessionId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch flights"
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
