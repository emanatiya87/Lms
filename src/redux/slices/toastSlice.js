import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    open: false,
    msg: "",
    type: "success",
  },
  reducers: {
    showToast: (state, action) => {
      state.open = true;
      state.msg = action.payload.msg;
      state.type = action.payload.type || "success";
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
