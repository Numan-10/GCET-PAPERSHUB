import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    if (!email || !password) {
      return handleError("All fields are required ");
    }
    try {
      setIsLoading(true);
      console.log("input Values login", inputValue);
      const { data } = await axios.post(
        `${BackendUrl}/login`,
        // `http://localhost:3000/login`,
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
        localStorage.setItem("email", email);

        setTimeout(() => {
          navigate("/home");
        }, 900);
        setInputValue({
          ...inputValue,
          email: "",
          password: "",
        });
      } else {
        handleError(message);
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
        // console.log(error);
        handleError(error?.response?.data?.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mt-5 mb-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7">
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
              <label htmlFor="email" className="form-label fw-semibold ">
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

        {/* Continue with Google  */}
        <Google />
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
