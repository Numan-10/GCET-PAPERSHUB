import API_BASE_URL from "../ApiUrl";

function Github({ label = "Continue with GitHub" }) {
  const githubAuthUrl = `${API_BASE_URL}/auth/github`;

  return (
    <button
      type="button"
      className="auth-btn auth-btn-github"
      onClick={() => {
        window.location.href = githubAuthUrl;
      }}
    >
      <img src="/Assets/github1.svg" alt="GitHub" className="auth-btn-icon" />
      <span>{label}</span>
    </button>
  );
}

export default Github;
