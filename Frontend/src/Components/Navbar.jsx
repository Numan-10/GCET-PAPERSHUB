import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setLogggedIn] = useState(false);
  const [cookies, removeCookie] = useCookies(["token"]);
  const [userData, setuserdata] = useState("");

  //Material UI Avatar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    try {
      if (cookies.token) {
        setLogggedIn(true);
        const DecodeToken = jwtDecode(cookies.token);
        const user = DecodeToken.user;
        setuserdata(user);
      } else {
        setLogggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Functions

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const AvatarName = userData.slice(0, 1).toUpperCase();

  const togglerDrawer = () => {
    setIsOpen(!isOpen);
  };
  const setopenfalse = () => {
    setIsOpen(!isOpen);
  };
  const logout = () => {
    removeCookie();
    setLogggedIn(false);
    setuserdata("");
    Navigate("/Signup");
  };

  const signup = () => {
    Navigate("/Signup");
  };

  return (
    <div className="Navbar d-flex justify-content-between  ">
      <div>
        <button className="p-3 hamburger ms-2 " onClick={togglerDrawer}>
          <img
            src="/Assets/More.svg"
            alt="Hamburger"
            className="img-fluid"
            style={{ width: "3rem" }}
          />
        </button>

        {/* --------------> Drawer <------------------- */}

        <div className={`drawer ${isOpen ? "open" : ""}`}>
          <button onClick={togglerDrawer} className="close-btn">
            ✕
          </button>

          <ul>
            <Link
              to="/Home"
              style={{ textDecoration: "none", color: "black" }}
              onClick={setopenfalse}
            >
              <li>Home</li>{" "}
            </Link>
            <Link
              to="/Content"
              style={{ textDecoration: "none", color: "black" }}
              onClick={setopenfalse}
            >
              <li>Content</li>
            </Link>
            <Link
              to="/Contributors"
              style={{ textDecoration: "none", color: "black" }}
              onClick={setopenfalse}
            >
              <li>Contributors</li>
            </Link>
          </ul>

          <Link
            to="/About"
            style={{ textDecoration: "none", color: "black" }}
            onClick={setopenfalse}
          >
            <h2 className="text-center link-underline-dark  aboutus">
              About us
            </h2>
          </Link>
        </div>
      </div>
      <div></div>

      {/*--------------------------->  Avatar + Logoout starts here  <--------------------------------------*/}

      {/* {isLoggedIn && ( */}
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Your Account">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  color: "white",
                  backgroundColor: "#360743",
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
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {isLoggedIn && (
            <MenuItem onClick={handleClose}>
              <Avatar /> {userData}
            </MenuItem>
          )}

          {!isLoggedIn && (
            <>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            </>
          )}
          {isLoggedIn && (
            <>
              <Divider />
              <MenuItem onClick={signup}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </>
          )}
        </Menu>
      </React.Fragment>
      {/* )} */}

      {/* --------------> Avatar + Logoout Ends here <----------------------- */}

      <button className="p-3 me-2" style={{ border: "none" }}>
        <Link to="/updates">
          <img
            src="/Assets/bell-outline.svg"
            alt="Notification"
            className="img-fluid"
            style={{ width: "4rem" }}
          />
        </Link>
      </button>
    </div>
  );
}

export default Navbar;
