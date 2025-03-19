import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../ApiUrl.js";
import Google from "../Google.jsx";

const Signup = () => {
  const BackendUrl = API_BASE_URL;

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { email, password, username } = inputValue;
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
      duration: 1000,
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
      duration: 1000,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      return handleError("All fields are required ");
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        ` ${BackendUrl}/signup`,

        {
          ...inputValue,
        }
      );
      const { success, message } = data;
      setIsLoading(false);
      if (success) {
        handleSuccess(message);

        navigate("/login");

        setInputValue({
          ...inputValue,
          email: "",
          password: "",
          username: "",
        });
      } else {
        handleError(message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        const errorDetails = error.response.data.error.details;
        if (Array.isArray(errorDetails) && errorDetails.length > 0) {
          handleError(errorDetails[0].message);
          setIsLoading(false);
        } else {
          handleError("An unexpected error occurred.");
          setIsLoading(false);
        }
      } else {
        handleError(error?.response?.data?.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mt-md-5 mb-md-5 container d-flex justify-content-center align-items-center">
      <div className="row ">
        <div className="col-1 col-md-2"></div>
        <div className="col-10 col-md-8 ">
          <h3 className="text-left fw-bold ">Sign up</h3>
          <div className="mb-3">
            <p className=" small">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none ">
                Login here
              </Link>
            </p>
            <hr />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
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
              <label htmlFor="username" className="form-label fw-semibold">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
                id="username"
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

            <div className="d-grid">
              {isLoading ? (
                <button
                  class="btn btn-primary"
                  type="button"
                  disabled={isLoading || !email || !password || !username}
                >
                  Processing... &nbsp;
                  <span
                    class="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                </button>
              ) : (
                <button type="submit" className="btn loginbtn">
                  Signup
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="col-1 col-md-2"></div>
        {/* Google  */}
        <Google />
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
