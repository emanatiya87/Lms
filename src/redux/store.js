// import { configureStore } from "@reduxjs/toolkit";
// import usersSliceReducer from "./slices/users";
// import toastReducer from "./slices/toastSlice";
// const store = configureStore({
//   reducer: {
//     user: usersSliceReducer,
//     toast: toastReducer,
//   },
// });
// export default store;
import coursesReducer from "./slices/coursesSlice";
import { configureStore } from "@reduxjs/toolkit";
import usersSliceReducer from "./slices/users";
import toastReducer from "./slices/toastSlice";

const loadUserState = () => {
  try {
    const serialized = localStorage.getItem("app-user-state");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (error) {
    console.warn("Failed to load user state from localStorage:", error);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    user: usersSliceReducer,
    toast: toastReducer,
    courses: coursesReducer,
  },
  preloadedState: {
    user: loadUserState(),
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("app-user-state", JSON.stringify(state.user));
  } catch (error) {
    console.warn("Failed to save user state to localStorage:", error);
  }
});

export default store;
