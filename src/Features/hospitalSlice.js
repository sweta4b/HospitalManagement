import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPatients: 0,
  totalOccupancyRate: 0,
  averageStayLength: 0,
  wardOccupants: [],
  topPerformingWard: {}
};

export const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    updateHospitalStats: (state, action) => {
      const {
        totalPatients,
        totalOccupancyRate,
        averageStayLength,
        wardOccupants,
        topPerformingWard
      } = action.payload;
      state.totalPatients = totalPatients;
      state.averageStayLength = averageStayLength;
      state.totalOccupancyRate = totalOccupancyRate;
      state.wardOccupants = wardOccupants;
      state.topPerformingWard = topPerformingWard;
    }
  }
});

export const { updateHospitalStats } = hospitalSlice.actions;
export default hospitalSlice.reducer;
