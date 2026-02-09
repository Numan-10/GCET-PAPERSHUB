import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // New password states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // Handle email input
  const handleOnChange = (e) => setEmail(e.target.value);

  // Handle OTP input
  const handleOtp = (e) => setOtp(e.target.value);

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Verifying OTP...");

    if (!otp) {
      return toast.error("Enter the Code!", { id: toastId });
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/verify-reset-otp`,
        {
          email,
          otp,
        }
      );

      const { message, success } = response.data;
      if (success) {
        toast.success(message, { id: toastId });
        setOtpVerified(true); // switch to password reset form
      } else {
        toast.error(message, { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // Send OTP Code
  const sendCode = async () => {
    const toastId = toast.loading("Sending Code...");
    setLoading(true);

    if (!email) {
      setLoading(false);
      return toast.error("Email is required!", { id: toastId });
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/SendCode`, {
        email,
      });

      const { message, success } = response.data;

      if (success) {
        toast.success(message, { id: toastId });
        setCodeSent(true);
      } else{
        toast.error(message, { id: toastId });
        setCodeSent(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Change password after OTP verification
  const changePassword = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Changing Password...");

    if (!newPassword || !confirmPassword) {
      return toast.error("All fields are required", { id: toastId });
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!", { id: toastId });
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/changePass`, {
        email,
        newPassword,
      });

      const { message, success } = response.data;
      if (success) {
        toast.success(message, { id: toastId });
        navigate("/login"); // redirect after success
      } else {
        toast.error(message, { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex justify-content-center align-items-start flex-grow-1 py-5">
        {!otpVerified ? (
          // ✅ OTP Form (step 1)
          <form
            onSubmit={verifyOtp}
            className="card p-4 p-md-5 rounded-5 flex-grow-1"
            style={{ maxWidth: "500px" }}
          >
            <div className="text-center mb-4">
              <img
                src="/Assets/favicon1-192x192.png"
                className="img-fluid"
                alt="logo"
                style={{ maxWidth: "80px" }}
              />
              <h2 className="fw-medium mt-2">Reset Password</h2>
              <p className="text-muted">
                Enter your email address and we will send you a verification
                code.
              </p>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-medium">
                Email<span className="text-danger"> *</span>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={handleOnChange}
                disabled={codeSent}
              />
            </div>

            {/* Code */}
            <div className="row g-2 mb-4">
              <div className="col-8">
                <label className="form-label">
                  Code<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Code"
                  value={otp}
                  onChange={handleOtp}
                />
              </div>
              <div className="col-4 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-outline-dark w-100"
                  onClick={sendCode}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Code"}
                </button>
              </div>
            </div>

            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                Continue
              </button>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => navigate("/login")}
              >
                Back to login
              </button>
            </div>
          </form>
        ) : (
          // ✅ New Password Form (step 2)
          <form
            onSubmit={changePassword}
            className="card p-4 p-md-5 rounded-5 flex-grow-1"
            style={{ maxWidth: "500px" }}
          >
            <div className="text-center mb-4">
              <img
                src="/Assets/favicon1-192x192.png"
                className="img-fluid"
                alt="logo"
                style={{ maxWidth: "80px" }}
              />
              <h2 className="fw-medium mt-2">Set New Password</h2>
              <p className="text-muted">Enter your new password below.</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">
                New Password<span className="text-danger"> *</span>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">
                Confirm Password<span className="text-danger"> *</span>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Toaster */}
      <Toaster />
    </div>
  );
};

export default ForgotPass;
