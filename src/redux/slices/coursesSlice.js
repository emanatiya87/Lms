import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const res = await fetch("http://localhost:3001/mockCourses");
    return res.json();
  },
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add reducers later if tutors can create/edit courses
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default coursesSlice.reducer;
