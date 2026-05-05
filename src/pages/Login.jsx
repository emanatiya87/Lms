import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GoogleSignin from "../components/GoogleSignin";
import FromLogin from "../components/forms/FromLogin";
import Logo from "../components/Logo";
export default function Login() {
  return (
    <>
      <Grid container spacing={0}>
        <Grid size={{ lg: 6 }}>
          <Stack
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: "100dvh",
              width: "100%",
              display: { xs: "none", lg: "flex" },
              p: "20px",
              background: "var(--gradient-primary)",
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", top: "30px", left: "20px" }}>
              <Logo></Logo>
            </Box>
            <Typography variant="h3" component="h3" sx={{ color: "#fff" }}>
              Welcome back. Keep growing.
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: "#ccc" }}>
              Pick up where you left off and continue building skills that
              matter.
            </Typography>
          </Stack>
        </Grid>
        <FromLogin />
      </Grid>
    </>
  );
}
