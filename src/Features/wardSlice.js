import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWards = createAsyncThunk("wards/fetchWards", async () => {
  console.log("fetching");
  const response = await axios.get(
    "https://patient-manage.sweta4b.repl.co/wards"
  );
  // console.log(response.data);
  return response.data;
});

export const deleteWard = createAsyncThunk(
  "wards/deleteWard",
  async (wardId) => {
    console.log("deleting Student", wardId);
    try {
      const response = await axios.delete(
        `https://patient-manage.sweta4b.repl.co/wards/${wardId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editWard = createAsyncThunk(
  "wards/editWard",
  async ({ wardId, wardData }) => {
    const response = await axios.post(
      `https://patient-manage.sweta4b.repl.co/wards/${wardId}`,
      wardData
    );
    // console.log(response.data);
    return response.data;
  }
);

export const addWard = createAsyncThunk("wards/addWard", async (newWard) => {
  const response = await axios.post(
    `https://patient-manage.sweta4b.repl.co/wards`,
    newWard
  );
  // console.log(response.data);
  return response.data;
});

const initialState = {
  wards: [],
  status: "idle",
  error: null
};

export const wardsSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWards.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWards.fulfilled]: (state, action) => {
      (state.status = "success"), (state.wards = action.payload);
    },
    [fetchWards.rejected]: (state, action) => {
      (state.status = "error"), console.log(action.error.message);
      state.error = action.error.message;
    },
    [deleteWard.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = state.wards.filter(
        (ward) => ward._id !== action.payload.data._id
      );
    },
    [deleteWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editWard.pending]: (state) => {
      state.status = "loading";
    },
    [editWard.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedWard = action.payload;
      const index = state.wards.findIndex(
        (ward) => ward._id === updatedWard._id
      );
      if (index !== -1) {
        state.wards[index] = updatedWard;
      }
    },
    [editWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addWard.pending]: (state) => {
      state.status = "loading";
    },
    [addWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards.push(action.payload.data);
    },
    [addWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export default wardsSlice.reducer;
