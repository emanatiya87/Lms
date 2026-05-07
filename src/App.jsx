import { lazy } from "react";
import Loader from "./components/Loader";
import ToastComponent from "./components/ToastComponent";
import { Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Courses = lazy(() => import("./pages/Courses"));
const Layout = lazy(() => import("./pages/Layout"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const PaymentPagewithId = lazy(() => import("./pages/PaymentPagewithId"));
import { Box } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home /> },
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "courses", element: <Courses /> },
        { path: ":id", element: <Courses /> },
        { path: "profile", element: <Profile /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "enroll", element: <PaymentPage /> },
        { path: "/course/:id", element: <CourseDetails /> },
        { path: "/enroll/:id", element: <PaymentPagewithId /> },
      ],
      errorElement: <NotFound></NotFound>,
    },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
      }}
    >
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
      <ToastComponent />
    </Box>
  );
}

export default App;
