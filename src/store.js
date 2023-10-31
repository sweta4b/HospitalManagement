import { configureStore } from "@reduxjs/toolkit";

import { patientsSlice } from "./Features/patientSlice";
import { wardsSlice } from "./Features/wardSlice";
import { hospitalSlice } from "./Features/hospitalSlice";

export default configureStore({
  reducer: {
    patients: patientsSlice.reducer,
    wards: wardsSlice.reducer,
    hospital: hospitalSlice.reducer
  }
});
