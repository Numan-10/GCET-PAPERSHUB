import OtpInput from "react-otp-input";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../ApiUrl";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(null);
  const onSubmit = async () => {
    try {
      if (otp.length !== 6) {
        return toast.error("Enter a valid OTP");
      }
      setOtp("");
      setStatus("loading");
      const response = await axios.post(`${API_BASE_URL}/Verify`, {
        otp,
        email,
      });
      setStatus("success");
      const { message, Token, success } = response.data;
      if (success) {
        localStorage.setItem("token", Token);
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
      className="d-flex justify-content-center align-items-center mt-5 mb-5 flex-column flex-1"
      style={{ minHeight: "60vh" }}
    >
      <h1>Enter Verification Code</h1>
      <p>Email: {email}</p>
      <div className="inputhandler">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="mx-2 fw-bold">-</span>}
          renderInput={(props) => (
            <input
              {...props}
              // type="number"
              // placeholder="0"
              className="form-control d-inline-block text-center mx-1 shadow-sm"
              style={{
                width: "60px",
                height: "60px",
                fontSize: "20px",
                borderRadius: "8px",
              }}
            />
          )}
        />
      </div>
      <div className="d-flex justify-content-around align-items-center mt-4 w-25">
        <div className="">
          <button
            type="Submit"
            onClick={onClear}
            className="btn btn-outline-secondary mt-5 me-3"
            disabled={status === "loading"}
          >
            Clear
          </button>
        </div>

        {/* <-----------------------Submit Button-----------------------> */}
        <div className="">
          <button
            type="submit"
            onClick={onSubmit}
            className={`btn mt-5 ${
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
      <Toaster />
    </div>
  );
};

export default Verify;
