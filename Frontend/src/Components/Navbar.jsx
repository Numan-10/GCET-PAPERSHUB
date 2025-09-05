import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import BugReportIcon from "@mui/icons-material/BugReport";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Logout, Login as LoginIcon } from "@mui/icons-material";
import Settings from "@mui/icons-material/Settings";
import { IoNotificationsCircleSharp } from "react-icons/io5";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [currUser, setcurrUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checkIsAdmin, setIsAdmin] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (user && token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.clear();
          setcurrUser(null);
        } else {
          setcurrUser(user);
        }
      } catch (err) {
        localStorage.clear();
        setcurrUser(null);
      }
    } else {
      setcurrUser(null);
    }
  }, [location.pathname]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const logout = () => {
    localStorage.clear();
    setcurrUser(null);
    navigate("/home");
    handleMenuClose();
    setTimeout(
      () =>
        toast.success("Logged out successfully", {
          duration: 2000,
          position: "top-center",
        }),
      800
    );
  };

  const AvatarName = currUser?.charAt(0)?.toUpperCase();

  useEffect(() => {
    const isAdmin = () => localStorage?.getItem("role") === "admin";
    setIsAdmin(isAdmin());
  }, [location.pathname]);

  return (
    <div className="Navbar d-flex justify-content-between align-items-center">
      {/* Hamburger Menu */}
      <div>
        <button
          className="p-3 hamburger ms-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="/Assets/More.svg"
            alt="Menu"
            className="img-fluid"
            style={{ width: "3rem", cursor: "pointer" }}
          />
        </button>
        <div className={`drawer ${isOpen ? "open" : ""}`}>
          <button onClick={() => setIsOpen(false)} className="close-btn">
            ✕
          </button>
          <ul>
            {["Home", "Content", "Contributors"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                onClick={() => setIsOpen(false)}
                style={{ textDecoration: "none", color: "black" }}
              >
                <li>{item}</li>
              </Link>
            ))}
          </ul>
          <Link
            to="/About"
            onClick={() => setIsOpen(false)}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h2 className="text-center link-underline-dark aboutus">
              About us
            </h2>
          </Link>
        </div>
      </div>

      {/* Avatar & Login/Logout */}
      <div className="d-flex justify-content-center align-items-center">
        {checkIsAdmin && (
          <Link to="/admin/dashboard">
            <button className="btn btn-primary btn-sm me-2">
              Admin Dashboard
            </button>
          </Link>
        )}

        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          {currUser ? (
            // Show Avatar and Menu for logged-in users
            <>
              <Tooltip title="Your Account">
                <IconButton
                  onClick={handleMenuOpen}
                  size="small"
                  sx={{ ml: 2 }}
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#6f6e96",
                      fontSize: "15px",
                    }}
                  >
                    {AvatarName || ""}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                  <span className="fw-semibold">{currUser}</span>
                </MenuItem>
                <Divider />
                {/* <MenuItem onClick={() => navigate("/settings")}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                <MenuItem onClick={() => navigate("/report")}>
                  <ListItemIcon>
                    <BugReportIcon fontSize="small" />
                  </ListItemIcon>
                  Report a Bug
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            // Show Login button for non-logged-in users
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="btn btn-success btn-sm d-flex align-items-center">
                <LoginIcon sx={{ mr: 1, fontSize: "16px" }} />
                Login
              </button>
            </Link>
          )}
        </Box>

        {/* Notification Icon */}
        <button
          className="p-3 me-2"
          style={{ border: "none", background: "transparent" }}
        >
          <Tooltip title="View Updates">
            <Link to="/updates">
              <button
                className="btn btn-primary btn-sm rounded-5 px-2 py-1 border-0"
                style={{
                  background:
                    "linear-gradient(135deg,rgb(188, 199, 41), #7b2ff7)",
                }}
              >
                <IoNotificationsCircleSharp size={26} color="white" />
              </button>
            </Link>
          </Tooltip>
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Navbar;
