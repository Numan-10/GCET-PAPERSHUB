import { FaBars } from "react-icons/fa";
import "../admin.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  //logout funcitonality
  const logout = () => {
    localStorage.clear();
    navigate("/home");
    toast.success("Logout Successfully");
  };
  return (
    <div className="navbar navbar-light bg-white shadow-sm px-3 d-flex justify-content-between navbar">
      <Toaster position="top-center" />
      <button
        className="btn btn-outline-primary d-md-none"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <span className="navbar-brand mb-0 h5">Admin Dashboard</span>
      <button className="btn btn-outline-danger btn-sm" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
