import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUsername(state, action) {
      state.user.username = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setLoading, setUsername } =
  userSlice.actions;

export default userSlice.reducer;
