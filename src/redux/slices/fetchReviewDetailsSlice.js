import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localBaseURL } from "../../config";

export const fetchFormDetails = createAsyncThunk(
  "formDetails/fetchFormDetails",
  async (sessionId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${localBaseURL}/api/ticket/getFormDetails`,
        {
          headers: {
            "X-Session-ID": sessionId,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const formDetailsSlice = createSlice({
  name: "formDetails",
  initialState: {
    formDetails: null,
    ticketPrice: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFormDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.formDetails = action.payload.result;
        state.ticketPrice = action.payload.ticketPrice;
      })
      .addCase(fetchFormDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default formDetailsSlice.reducer;
