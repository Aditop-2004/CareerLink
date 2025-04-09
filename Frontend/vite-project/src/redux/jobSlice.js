import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    adminJobs: [], //all the jobs created by admin
    filter: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
export const { setAllJobs, setAdminJobs, setFilter } = jobSlice.actions;
export default jobSlice.reducer;
