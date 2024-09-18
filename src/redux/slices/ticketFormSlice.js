import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localBaseURL } from "../../config";

const initialState = {
  formState: "Active",
  feedback: "",
};

export const searchFlights = createAsyncThunk(
  "ticketForm/searchFlights",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${localBaseURL}/api/ticket/createForm`,
        formData
      );

      if (response.status === 200 && response.data.sessionId) {
        localStorage.setItem("SESSION_ID", response.data.sessionId);
        return response.data;
      } else {
        return rejectWithValue(
          "Unexpected response status: " + response.data.message
        );
      }
    } catch (error) {
      return rejectWithValue("Failed to submit ticket form");
    }
  }
);

const ticketFormSlice = createSlice({
  name: "ticketForm",
  initialState,
  reducers: {
    setFormState: (state, action) => {
      state.formState = action.payload;
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },

    resetForm: (state) => {
      state.formState = "Active";
      state.feedback = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.formState = "Loading";
        state.feedback = "";
      })
      .addCase(searchFlights.fulfilled, (state) => {
        state.formState = "Success";
        state.feedback = "";
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.formState = "Active";
        state.feedback = action.payload;
      });
  },
});

export const { setFormState, setFeedback, resetForm } = ticketFormSlice.actions;

export default ticketFormSlice.reducer;
