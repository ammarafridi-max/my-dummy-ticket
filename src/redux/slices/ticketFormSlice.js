import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../config";

const initialState = {
  formState: "Active",
  feedback: "",
};

export const searchFlights = createAsyncThunk(
  "ticketForm/searchFlights",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${baseURL}/api/ticket/createForm`,
        formData
      );

      if (res.status === 200 && res.data.sessionId) {
        localStorage.setItem("SESSION_ID", res.data.sessionId);
        return res.data;
      } else {
        return rejectWithValue(
          res.data.message || "Unexpected response status"
        );
      }
    } catch (error) {
      console.error("Error searching flights:", error);
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
