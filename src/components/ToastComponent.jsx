import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { hideToast } from "../redux/slices/toastSlice";

export default function ToastComponent() {
  const dispatch = useDispatch();
  const { open, msg, type } = useSelector((state) => state.toast);

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={type} sx={{ width: "100%" }} onClose={handleClose}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
