import { Link, useNavigate } from "react-router-dom";
import "../admin.css";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { FaBug } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { FiCheckSquare } from "react-icons/fi";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`sidebar text-white p-3 ${
        isOpen ? "open" : "closed"
      } d-md-block`}
    >
      {/* ----------------->Logo & Close Button<--------------------- */}
      <div className="d-flex align-items-center mb-4">
        <img
          src="/Assets/codeclubW.svg"
          className="img-fluid pointer"
          style={{ width: "50px", cursor: "pointer" }}
          alt="log"
          onClick={() => navigate("/home")}
        />
        <span
          className="ms-2 fw-bolder"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Paper's Hub
        </span>

        {/* close button only on mobile */}
        <button
          className="btn btn-sm btn-light d-md-none ms-auto"
          onClick={toggleSidebar}
        >
          ✖
        </button>
      </div>

      {/* -------------->Links<--------------------- */}
      <ul className="nav flex-column gap-3 mt-5 mx-2">
        <li className="nav-item">
          <Link className="nav-link text-white p-1" to="/admin/dashboard">
            <MdDashboardCustomize /> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white p-1" to="/admin/users">
            <FaUser /> Users
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-white p-1"
            to="/admin/upload/uploadpapers"
          >
            <FaCloudUploadAlt /> Upload
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-white p-1"
            to="/admin/view-content/papers"
          >
            <FaFolderOpen /> All Content
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white p-1" to="/admin/feedbacks">
            <FaComments /> Feedback
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white p-1" to="/admin/reports">
            <FaBug /> Bug reports
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white p-1" to="/admin/notifications">
            <IoMdNotifications size={18} /> Notifications
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white p-1" to="/admin/check-contributions">
            <FiCheckSquare size={18} /> Check Contributions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
