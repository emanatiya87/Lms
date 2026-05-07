import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const generateDefaultCourse = (formData = {}) => ({
  id: formData.id || Date.now().toString(),
  title: formData.title || "",
  subtitle: formData.subtitle || "",
  image:
    formData.image ||
    "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y291cnNlfGVufDB8fDB8fHww",
  rating: formData.rating || 0,
  reviewCount: formData.reviewCount || 0,
  enrolledCount: formData.enrolledCount || 0,
  level: formData.level || "Beginner",
  price: formData.price || 0,
  category: formData.category || "Web Development",
  description: formData.description || "",
  instructor: formData.instructor || {
    name: "tutor",
    avatar:
      "https://plus.unsplash.com/premium_photo-1682787494977-d013bb5a8773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fHww",
    rating: 0,
    students: 0,
  },
  curriculum: formData.curriculum || [],
  createdAt: formData.createdAt || new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const res = await fetch("http://localhost:3001/mockCourses");
    const data = await res.json();
    return data.map((course) => generateDefaultCourse(course));
  },
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const completeCourse = generateDefaultCourse(courseData);
      const res = await fetch("http://localhost:3001/mockCourses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completeCourse),
      });
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3001/mockCourses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...courseData,
          id,
          updatedAt: new Date().toISOString(),
        }),
      });
      return await res.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:3001/mockCourses/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
    selectedCourse: null,
  },
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = generateDefaultCourse(action.payload);
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
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
      })
      // Create course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(generateDefaultCourse(action.payload));
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (c) => c.id === action.payload.id,
        );
        if (index !== -1) {
          state.courses[index] = generateDefaultCourse(action.payload);
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCourse, clearSelectedCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
