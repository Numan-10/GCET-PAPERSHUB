import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Google from "../Google";
import Github from "../Github";

const parseOAuthParams = (location) => {
  const rawParams = location.hash?.startsWith("#")
    ? location.hash.slice(1)
    : location.search;
  const params = new URLSearchParams(rawParams);
  const provider = params.get("oauth");
  const success = params.get("success") === "true";
  const message = params.get("message");

  return { provider, success, message };
};

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { provider, success, message } = parseOAuthParams(location);
    if (!provider) return;

    const label = provider === "google" ? "Google" : "GitHub";
    if (success) {
      sessionStorage.setItem("oauthLoginProvider", provider);
      navigate("/home", { replace: true });
      toast.dismiss();
      return;
    }

    toast.error(message || `${label} login failed`);
    navigate("/login", { replace: true });
  }, [location, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">
            Welcome to <span>GCET Papers Hub</span>
          </h1>
          <p className="auth-subtitle">
            Log in to access previous year papers.
          </p>
          <div className="auth-links">
            <Link to="/home" className="auth-link">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="auth-actions">
          <Google label="Continue with Google" />
          <Github label="Continue with GitHub" />
        </div>

        <div className="auth-divider"></div>

        <div className="auth-brand">
          <img
            src="/Assets/codeclubW.jpg"
            alt="GCET Papers Hub"
            className="auth-brand-logo"
          />
          <div>
            <div className="auth-brand-title">GCET Papers Hub</div>
            <div className="auth-brand-subtitle">
              organized by students, for students.
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
