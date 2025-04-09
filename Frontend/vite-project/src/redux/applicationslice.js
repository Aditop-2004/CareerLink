import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    jobapplications: [],
  },
  reducers: {
    setJobApplications: (state, action) => {
      state.jobapplications = action.payload;
    },
  },
});
export const { setJobApplications } = applicationSlice.actions;
export default applicationSlice.reducer;
