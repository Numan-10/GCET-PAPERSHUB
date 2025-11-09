import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../ApiUrl";
import Google from "../Google";

const Login = () => {
  const BackendUrl = API_BASE_URL;

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

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Verifying Credentials");
    e.preventDefault();
    if (!email || !password) {
      return handleError("All fields are required ");
    }
    try {
      setIsLoading(true);

      const { data } = await axios.post(
        `${BackendUrl}/login`,

        {
          ...inputValue,
        }
      );
      setIsLoading(false);
      const { success, message } = data;

      if (success) {
        setTimeout(() => {
          toast.success(message, { id: toastId });
          navigate("/verify", { state: { email } });
        }, 250);

        setInputValue({
          ...inputValue,
          email: "",
          password: "",
        });
      } else {
        return toast.error(message, { id: toastId });
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        const errorDetails = error.response.data.error.details;
        if (Array.isArray(errorDetails) && errorDetails.length > 0) {
          setIsLoading(false);
          return toast.error(errorDetails[0].message, { id: toastId });
        } else {
          setIsLoading(false);
          return toast.error("An unexpected error occurred.", { id: toastId });
        }
      } else {
        setIsLoading(false);
        return toast.error(error?.response?.data?.message, { id: toastId });
      }
    }
  };

  return (
    <div className="mt-md-5 mb-md-5 container d-flex justify-content-center align-items-center">
      {}
      <div className="row ">
        <div className="col-1 col-md-2"></div>
        <div className="col-10 col-md-8">
          <h3 className="text-left fw-bold">Sign in</h3>
          <div className="mb-3">
            <p className=" small">
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-decoration-none ">
                Signup here
              </Link>
            </p>
            <hr />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-4">
              <label
                htmlFor="email"
                className="form-label fw-semibold "
                required
              >
                Email Address
              </label>
              <span className="text-danger"> *</span>
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
              <span className="text-danger"> *</span>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                id="password"
                className="form-control"
              />
              <div className="form-text text-end link-opacity-100">
                <Link to={"/forgot-password"}>Forgot Password?</Link>
              </div>
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
                <button type="submit" className="btn loginbtn">
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="col-1 col-md-2"></div>

        {/* Continue with Google  */}
        <Google />
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
