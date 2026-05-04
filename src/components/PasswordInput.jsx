import { useState } from "react";
import {
  IconButton,
  Input,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel>Password</InputLabel>
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShow(!show)}>
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
