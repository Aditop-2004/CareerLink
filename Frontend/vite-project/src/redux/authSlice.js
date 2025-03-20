import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false, //for giving a feel of loading while login and signup
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
