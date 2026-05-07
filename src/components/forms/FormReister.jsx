import { useState } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { showToast } from "../../redux/slices/toastSlice";
import RegisterFields from "../RegisterFields";
import { useNavigate } from "react-router";
import Logo from "../Logo";
export default function FormRegister() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users-collection", user.uid), {
        fullName: form.fullName,
        email: form.email,
        role: form.role,
        uid: user.uid,
      });

      dispatch(
        showToast({ msg: "Account created successfully", type: "success" }),
      );

      // Reset form
      setForm({
        fullName: "",
        email: "",
        password: "",
        role: "student",
      });
      navigator("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Stack
      spacing={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
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
      <Stack spacing={1}>
        <Typography variant="h4">Create your account</Typography>
        <Typography variant="body1" color="textSecondary">
          Start learning in seconds.
        </Typography>
      </Stack>

      <Stack
        spacing={2}
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "70%" }}
      >
        <RegisterFields form={form} setForm={setForm} />

        <Button variant="contained" type="submit">
          Create account
        </Button>

        {error && (
          <Typography color="error" textAlign="center">
            Error: {error}
          </Typography>
        )}
      </Stack>

      <Box>
        Already have an account?
        <Button href="/login">Login</Button>
      </Box>
    </Stack>
  );
}
