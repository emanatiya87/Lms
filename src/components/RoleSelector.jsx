import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";

export default function RoleSelector({ value, onChange }) {
  return (
    <FormControl>
      <FormLabel>Role</FormLabel>
      <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
        <FormControlLabel value="student" control={<Radio />} label="Student" />
        <FormControlLabel value="tutor" control={<Radio />} label="Tutor" />
      </RadioGroup>
    </FormControl>
  );
}
