import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FromRegister from "../components/forms/FormReister";
export default function Register() {
  return (
    <>
      <Grid container spacing={0}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <FromRegister></FromRegister>
        </Grid>
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
              logo
            </Box>
            <Typography variant="h3" component="h3" sx={{ color: "#fff" }}>
              Join 80,000+ learners worldwide.{" "}
            </Typography>
            <Typography variant="body2" component="p" sx={{ color: "#ccc" }}>
              Get instant access to courses in Web Dev, AI, Design, and Mobile.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
