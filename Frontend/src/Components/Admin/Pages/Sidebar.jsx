import { Link } from "react-router-dom";
import "../admin.css";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FaComments } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
          className="img-fluid"
          style={{ width: "50px" }}
          alt="log"
        />
        <span className="ms-2 fw-bolder">Paper's Hub</span>

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
            <FaHome /> Dashboard
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
      </ul>
    </div>
  );
};

export default Sidebar;
