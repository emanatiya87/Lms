import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  email: null,
  token: null,
  fullName: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...state, ...action.payload };
    },
    clearUser(state) {
      localStorage.removeItem("app-user-state");
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
