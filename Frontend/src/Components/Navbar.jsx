import React, { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const togglerDrawer = () => {
    setIsOpen(!isOpen);
  };
  const setopenfalse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="Navbar d-flex justify-content-between  ">
      <button className="p-3 hamburger " onClick={togglerDrawer}>
        <img src="/Assets/More.svg" alt="Hamburger" className="img-fluid" />
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
            {" "}
            <li>Home</li>{" "}
          </Link>
          <Link
            to="/Content"
            style={{ textDecoration: "none", color: "black" }}  onClick={setopenfalse}
          >
            {" "}
            <li>Content</li>
          </Link>
          <Link
            to="/Contributors"
            style={{ textDecoration: "none", color: "black" }}  onClick={setopenfalse}
          >
            {" "}
            <li>Contributors</li>
          </Link>
        </ul>

        <Link to="/About" style={{ textDecoration: "none", color: "black" }} onClick={setopenfalse}>
          <h2 className="text-center link-underline-dark  aboutus">About us</h2>
        </Link>
      </div>

      <button className="p-3 " style={{ border: "none" }}>
        <Link to="/updates">
          <img
            src="/Assets/bell-outline.svg"
            alt="Notification"
            className="img-fluid"
          />
        </Link>
      </button>
    </div>
  );
}

export default Navbar;
