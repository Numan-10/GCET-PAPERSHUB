import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
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



  // checking role
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

      {/* Avatar & Logout */}
      <div className="d-flex justify-content-center align-items-center">
        {/* <Link to="/upload">
          <button className="btn btn-success btn-sm">Upload here</button>
        </Link> */}

        {checkIsAdmin && (
          <Link to="/admin/dashboard">
            <button className="btn btn-primary btn-sm">Admin-Dashboard</button>
          </Link>
        )}
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title={currUser ? "Your Account" : "Login"}>
            <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
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
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {currUser ? (
            <>
              <MenuItem>
                <Avatar />
                &nbsp;<span className="fw-semibold">{currUser}</span>
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <Divider />
              <MenuItem onClick={() => navigate("/login")}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            </>
          )}
        </Menu>

        {/* ---------- Notification Icon ---------- */}
        <button className="p-3 me-2" style={{ border: "none" }}>
          <Tooltip title="View Updates">
            <Link to="/updates">
              <img
                src="/Assets/bell-outline.svg"
                alt="Notification"
                className="img-fluid"
                style={{ width: "4rem" }}
              />
            </Link>
          </Tooltip>
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Navbar;
