import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    filter:"",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setFilter:(state,action) => {
      state.filter = action.payload;
    }
  },
});

export const { setSingleCompany, setCompanies,setFilter } = companySlice.actions;
export default companySlice.reducer;
