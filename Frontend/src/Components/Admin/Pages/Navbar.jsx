import { FaBars } from "react-icons/fa";
import "../admin.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../ApiUrl";
import { clearReadableAuthCookies, getAuthUser } from "../../../utils/authCookies";

export default function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  //logout funcitonality
  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      // Ignore logout API errors and still clear client state
    }
    clearReadableAuthCookies();
    navigate("/home");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    const User = getAuthUser();
    setUser(User);
  }, []);

  return (
    <div className="navbar navbar-light bg-white shadow-sm px-3 d-flex justify-content-between navbar">
      <div className="">
        <button
          className="btn btn-outline-primary d-md-none"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <span className="d-none d-md-block navbar-brand mb-0 h5 fw-medium fs-5">{`Welcome ${user} !`}</span>
      </div>
      <div className="">
        <button
          className="btn btn-outline-dark btn-sm me-2"
          onClick={() => navigate("/home")}
        >
          Back to home
        </button>
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
