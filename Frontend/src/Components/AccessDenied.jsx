import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-3 fw-bold text-danger">403</h1>
      <h2 className="fw-semibold mb-3">Access Denied</h2>
      <p className="mb-4 text-muted">
        You don't have permission to view this page.
      </p>
      <button
        className="btn btn-primary px-4 py-2 rounded-4 fw-semibold"
        onClick={() => navigate("/home")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default AccessDenied;
