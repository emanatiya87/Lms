import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Logo from "../../components/Logo";
import PasswordInput from "../PasswordInput";
import GoogleSignin from "../GoogleSignin";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

import { useDispatch } from "react-redux";
import { showToast } from "../../redux/slices/toastSlice";

import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/users";
import { doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getDoc } from "firebase/firestore";
export default function FromLogin() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      dispatch(
        showToast({
          msg: "Logged in successfully",
          type: "success",
        }),
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      console.log(user);
      localStorage.setItem("token", token);
      localStorage.setItem("uid", user.uid);
      const userRef = doc(db, "users-collection", user.uid);
      const userSnap = await getDoc(userRef);

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          token,
          fullName: userSnap.data().fullName,
          role: userSnap.data().role,
          photo: userSnap.data().photo,
        }),
      );
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid size={{ xs: 12, lg: 6 }}>
      <Stack
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: { xs: "block", lg: "none" },
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        >
          <Logo />{" "}
        </Box>

        <Box sx={{ width: "70%" }}>
          {/* Title */}
          <Stack spacing={1} mb={2}>
            <Typography variant="h3">Sign in</Typography>
            <Typography variant="body1" color="textSecondary">
              Welcome back to LumenLMS.
            </Typography>
          </Stack>

          {/* Form */}
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="standard"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              fullWidth
            />

            <PasswordInput
              value={form.password}
              onChange={(value) => setForm({ ...form, password: value })}
            />

            <Box sx={{ textAlign: "right" }}>
              <Button variant="text" size="small">
                Forgot?
              </Button>
            </Box>

            <Button variant="contained" type="submit">
              Login
            </Button>

            <GoogleSignin />

            <Box sx={{ textAlign: "center" }}>
              Don’t have an account?
              <Button component={Link} to="/register">
                Create one
              </Button>
            </Box>
          </Stack>
        </Box>
        {error && (
          <Box>
            <Typography color="error" sx={{ textAlign: "center" }}>
              Error: {error}
            </Typography>
          </Box>
        )}
      </Stack>
    </Grid>
  );
}
