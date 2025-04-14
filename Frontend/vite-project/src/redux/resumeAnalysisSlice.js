import { createSlice } from "@reduxjs/toolkit";

const resumeAnalysisSlice = createSlice({
  name: "resumeAnalysis",
  initialState: {
    resumeAnalysis: null,
  },
  reducers: {
    setResumeAnalysis: (state, action) => {
      state.resumeAnalysis = action.payload;
    },
  },
});

export const { setResumeAnalysis } = resumeAnalysisSlice.actions;
export default resumeAnalysisSlice.reducer;
