import { FaBars } from "react-icons/fa";
import "../admin.css";
export default function Navbar({ toggleSidebar }) {
  return (
    <div className="navbar navbar-light bg-white shadow-sm px-3 d-flex justify-content-between navbar">
      <button className="btn btn-outline-primary d-md-none" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <span className="navbar-brand mb-0 h5">Admin Dashboard</span>
      <button className="btn btn-outline-danger btn-sm">Logout</button>
    </div>
  );
}
