import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { Button, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/slices/toastSlice";
import { setUser } from "../redux/slices/users";

export default function GoogleSignin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const token = await user.getIdToken();

      // 💾 localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("uid", user.uid);

      // 🔥 Firestore check
      const userRef = doc(db, "users-collection", user.uid);
      const userSnap = await getDoc(userRef);

      let userData;

      if (!userSnap.exists()) {
        userData = {
          uid: user.uid,
          fullName: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "student",
          token: token,
        };

        await setDoc(userRef, userData);
      } else {
        userData = {
          ...userSnap.data(),
          token: token,
        };
      }

      // 🟢 Redux SAVE USER
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          fullName: userData.fullName,
          photo: userData.photo,
          role: userData.role,
          token: token,
        }),
      );

      // 🟢 Toast
      dispatch(
        showToast({
          msg: "Logged in successfully",
          type: "success",
        }),
      );

      // 🚀 redirect
      navigate("/");
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
    <Box>
      <Button
        onClick={googleLogin}
        fullWidth
        variant="contained"
        startIcon={
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="google"
            style={{ width: 20, height: 20 }}
          />
        }
        sx={{
          textTransform: "none",
          backgroundColor: "#ffffff",
          color: "#3c4043",
          border: "1px solid #dadce0",
          fontSize: "16px",
          fontWeight: 500,
          py: 1.2,
          borderRadius: "8px",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          "&:hover": {
            backgroundColor: "#f7f8f8",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 3px 1px, rgba(60, 64, 67, 0.15) 0px 1px 4px 2px",
          },
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
}
