import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Box,
  Card,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/enroll-success`,
      },
      redirect: "if_required",
    });

    if (submitError) {
      setError(submitError.message);
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: "20px auto" }}
    >
      {/* Stripe auto-generates card input fields here */}
      <PaymentElement />

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      <Button
        type="submit"
        disabled={loading || !stripe}
        variant="contained"
        size="large"
        fullWidth
        sx={{
          bgcolor: "#2563eb",
          "&:hover": { bgcolor: "#1d4ed8" },
          textTransform: "none",
          mt: 3,
        }}
        className="py-3 text-base font-medium tracking-wide transition-all hover:shadow-lg bg-blue-600"
      >
        {loading ? "Processing..." : "Pay & Enroll"}
      </Button>
    </form>
  );
}

export default function PaymentPagewithId() {
  const { id } = useParams();
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/mockCourses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPrice(data.price);
      })
      .catch((err) => console.log(err));
  }, [id]);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const startPayment = async (amountInCents) => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInCents }),
      });
      const data = await res.json();
      if (data.error) {
        alert(`Backend error: ${data.error}`);
      } else {
        setClientSecret(data.clientSecret);
      }
    } catch (err) {
      console.error("❌ Failed to fetch clientSecret:", err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (success) {
    return (
      <Container maxWidth="sm">
        <Box className="flex items-center justify-center min-h-[80vh] bg-linear-to-br from-slate-50 to-blue-50 p-4">
          <Card className="w-full p-8 shadow-2xl rounded-2xl text-center">
            <CheckCircleIcon className="text-green-500 w-20 h-20 mx-auto mb-4 drop-shadow-md" />
            <Typography variant="h4" className="font-bold text-gray-800 mb-2">
              Payment Successful!
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-4">
              You are now enrolled for{" "}
              <strong className="text-blue-600 text-lg">{price} $</strong>
            </Typography>
          </Card>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="sm">
        <Box className="flex items-center justify-center min-h-[80vh] bg-linear-to-br from-slate-50 to-blue-50 p-4">
          <Card className="w-full shadow-2xl rounded-2xl overflow-hidden transition-all">
            {!clientSecret ? (
              <Box className="p-8 text-center">
                <Box className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <PaymentsIcon className="text-blue-600 w-8 h-8" />
                </Box>
                <Typography
                  variant="h5"
                  className="font-bold text-gray-800 mb-2"
                >
                  Complete Enrollment
                </Typography>
                <Typography variant="body2" className="text-gray-500 mb-6">
                  Secure payment powered by Stripe
                </Typography>

                <Box className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
                  <Typography variant="body1" className="text-gray-600">
                    Course Price
                  </Typography>
                  <Typography
                    variant="h3"
                    className="font-extrabold text-gray-900 mt-1"
                  >
                    {price}$
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => startPayment(price)}
                  disabled={loading}
                  className="py-3 text-base font-medium tracking-wide transition-all hover:shadow-lg"
                  sx={{
                    bgcolor: "#2563eb",
                    "&:hover": { bgcolor: "#1d4ed8" },
                    textTransform: "none",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Enroll Now"
                  )}
                </Button>

                <Box className="flex items-center justify-center mt-5 text-gray-400 text-sm">
                  <LockOutlinedIcon className="w-4 h-4 mr-1" /> 256-bit SSL
                  Encryption
                </Box>
              </Box>
            ) : (
              <Box className="p-6">
                <Box className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                  >
                    Payment Details
                  </Typography>
                  <Typography variant="h6" className="font-bold text-blue-600">
                    {price}
                  </Typography>
                </Box>

                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm
                    onSuccess={() => setSuccess(true)}
                    priceInCents={price}
                  />
                </Elements>

                <Box className="mt-5 flex items-center justify-center text-gray-400 text-xs">
                  <LockOutlinedIcon className="w-3 h-3 mr-1" /> Your info is
                  securely processed by Stripe
                </Box>
              </Box>
            )}
          </Card>
        </Box>
      </Container>
    </>
  );
}
