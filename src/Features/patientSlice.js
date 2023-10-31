import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    console.log("fetching");
    const response = await axios.get(
      "https://patient-manage.sweta4b.repl.co/patients"
    );
    // console.log(response.data);
    return response.data;
  }
);

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (patientId) => {
    console.log("deleting Student", patientId);
    try {
      const response = await axios.delete(
        `https://patient-manage.sweta4b.repl.co/patients/${patientId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editPatient = createAsyncThunk(
  "patients/editPatient",
  async ({ patientId, patientData }) => {
    const response = await axios.post(
      `https://patient-manage.sweta4b.repl.co/patients/${patientId}`,
      patientData
    );
    // console.log(response.data);
    return response.data;
  }
);

export const addPatient = createAsyncThunk(
  "patients/addPatient",
  async (newPatient) => {
    const response = await axios.post(
      `https://patient-manage.sweta4b.repl.co/patients`,
      newPatient
    );
    // console.log(response.data);
    return response.data;
  }
);

const initialState = {
  patients: [],
  status: "idle",
  error: null
};

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatients.fulfilled]: (state, action) => {
      (state.status = "success"), (state.patients = action.payload);
    },
    [fetchPatients.rejected]: (state, action) => {
      (state.status = "error"), console.log(action.error.message);
      state.error = action.error.message;
    },
    [deletePatient.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatient.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload.data._id
      );
    },
    [deletePatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editPatient.pending]: (state) => {
      state.status = "loading";
    },
    [editPatient.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedPatient = action.payload;
      const index = state.patients.findIndex(
        (patient) => patient._id === updatedPatient._id
      );
      if (index !== -1) {
        state.patients[index] = updatedPatient;
      }
    },
    [editPatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addPatient.pending]: (state) => {
      state.status = "loading";
    },
    [addPatient.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients.push(action.payload.data);
    },
    [addPatient.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export default patientsSlice.reducer;
