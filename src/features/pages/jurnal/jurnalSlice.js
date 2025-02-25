import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jurnal: null,
};

export const jurnalSlice = createSlice({
  name: "jurnal",
  initialState,
  reducers: {
    setJurnal(state, action) {
      state.jurnal = action.payload;
    },
  },
});

export const { setJurnal } = jurnalSlice.actions;

export default jurnalSlice.reducer;
