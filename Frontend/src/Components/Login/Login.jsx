import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const getToastWidth = () => {
    return window.innerWidth > 768 ? "300px" : "90%";
  };

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-center",
      style: { marginTop: "1rem", width: getToastWidth() },
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
      style: { marginTop: "1rem", width: getToastWidth() },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
     return handleError("All fields are required ");
    }
    try {
      setIsLoading(true);
      console.log("input Values login", inputValue);
      const { data } = await axios.post(
        // `${import.meta.env.VITE_APP_BACKEND_URL}/login`,
        `http://localhost:3000/login`,
        {
          ...inputValue,
        }
      );
      setIsLoading(false);
      const { success, message, JwtToken, name, email } = data;
      console.log("data login" + data);
      if (success) {
        handleSuccess(message);

        localStorage.setItem("token", JwtToken);
        localStorage.setItem("user", name);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
        setInputValue({
          ...inputValue,
          email: "",
          password: "",
        });
      } else {
        handleError(message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorDetails = error.response.data.error.details;
        if (Array.isArray(errorDetails) && errorDetails.length > 0) {
          handleError(errorDetails[0].message);
        } else {
          handleError("An unexpected error occurred.");
        }
      } else {
        handleError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center fw-bold text-success">
              Login to Your Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-4">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  id="email"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  id="password"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <p className="text-muted small">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-decoration-none text-success"
                  >
                    Signup here
                  </Link>
                </p>
              </div>
              <div className="d-grid">
                {isLoading ? (
                  <button
                    class="btn btn-primary"
                    type="button"
                    disabled={isLoading || !email || !password || !username}
                  >
                    Loading... &nbsp;
                    <span
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success">
                    Login
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
