import API_BASE_URL from "../ApiUrl";
import toast from "react-hot-toast";

function Google({ label = "Continue with Google" }) {
  const googleAuthUrl = `${API_BASE_URL}/auth/google`;

  return (
    <button
      type="button"
      onClick={() => {
        if (!googleAuthUrl) {
          toast.error("Google login is not available");
          return;
        }
        window.location.href = googleAuthUrl;
      }}
      className="auth-btn auth-btn-google"
    >
      <img src="/Assets/google.svg" alt="Google" className="auth-btn-icon" />
      <span>{label}</span>
    </button>
  );
}

export default Google;
