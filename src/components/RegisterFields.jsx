import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import PasswordInput from "./PasswordInput";
import RoleSelector from "./RoleSelector";

export default function RegisterFields({ form, setForm }) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Full name"
        variant="standard"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />

      <TextField
        label="Email"
        variant="standard"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <PasswordInput
        value={form.password}
        onChange={(value) => setForm({ ...form, password: value })}
      />

      <RoleSelector
        value={form.role}
        onChange={(value) => setForm({ ...form, role: value })}
      />
    </Stack>
  );
}
