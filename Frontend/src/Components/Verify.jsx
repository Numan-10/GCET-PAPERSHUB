import OtpInput from "react-otp-input";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../ApiUrl";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(null);
  const onSubmit = async () => {
    try {
      if (otp.length !== 4) {
        return toast.error("Enter a valid OTP");
      }
      setOtp("");
      setStatus("loading");
      const response = await axios.post(`${API_BASE_URL}/Verify`, {
        otp,
        email,
      });
      setStatus("success");
      const { message, Token, success,user,role } = response.data;
      if (success) {
        localStorage.setItem("token", Token);
        localStorage.setItem("user", user);
        localStorage.setItem("role", role);
        navigate("/home");
        setTimeout(() => {
          toast.success(message);
        }, 150);
      }
      console.log(response.data);
    } catch (err) {
      setStatus("error");
      console.log(err);
    }
  };
  const onClear = async () => {
    setOtp("");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center mt-5 mb-5 flex-column"
      style={{ minHeight: "65vh" }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <h1 className=" mb-3">Enter Verification Code</h1>
          <p className=""><strong>Email</strong>: <i>{email}</i></p>

          <div className="d-flex justify-content-center mb-4">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className="mx-2 fw-bold">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="form-control text-center mx-1 "
                  style={{
                    height: "60px",
                    fontSize: "1.25rem",
                    borderRadius: "0.5rem",
                  }}
                />
              )}
            />
          </div>

          <div className="d-flex flex-wrap mt-5">
            <button
              type="button"
              onClick={onClear}
              className="btn btn-outline-secondary me-3 mb-2"
              disabled={status === "loading"}
            >
              Clear
            </button>

            <button
              type="button"
              onClick={onSubmit}
              className={`btn ms-4 mb-2 ${
                status === "error" ? "btn-danger" : "btn-success"
              }`}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : status === "success" ? (
                "Verified"
              ) : status === "error" ? (
                "Try Again"
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Verify;
