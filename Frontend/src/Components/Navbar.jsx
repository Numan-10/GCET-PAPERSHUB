import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
  const [userData, setUserData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (storedUser && storedEmail) {
      let decodedToken = null;
      if (token) {
        try {
          decodedToken = jwtDecode(token);
        } catch (error) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
        }
      }

      setUserData({
        User: storedUser,
        Email: storedEmail,
        id: decodedToken?.id || null,
      });
    } else {
      setUserData(null);
    }
  }, [location]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    setUserData(null);
    navigate("/home");
    handleMenuClose();
  };

  const AvatarName = userData?.User?.charAt(0)?.toUpperCase();

  return (
    <div className="Navbar d-flex justify-content-between align-items-center">
      {/* ---------- Hamburger Menu ---------- */}
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

        {/* ------------- Drawer ------------- */}
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

      {/* ---------- Avatar & Logout ---------- */}
      <div className="d-flex justify-content-center align-items-center">
        {userData?.id === import.meta.env.VITE_APP_ID && (
          <Link to="/upload">
            <button className="btn btn-success btn-sm">Upload here</button>
          </Link>
        )}

        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Your Account">
            <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#6f6e96",
                  fontSize: "15px",
                }}
              >
                {AvatarName}
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
          {userData ? (
            <>
              <MenuItem>
                <Avatar />
                &nbsp;<span className="fw-semibold">{userData.User}</span>
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
    </div>
  );
}

export default Navbar;
