import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/users";
import { showToast } from "../redux/slices/toastSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem("token");
      localStorage.removeItem("uid");

      dispatch(clearUser());

      dispatch(
        showToast({
          msg: "Logged out successfully",
          type: "success",
        }),
      );

      navigate("/login");
    } catch (error) {
      dispatch(
        showToast({
          msg: error.message,
          type: "error",
        }),
      );
    }
  };
  return (
    <>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </>
  );
}
