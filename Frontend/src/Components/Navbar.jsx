import React, { useState } from "react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const togglerDrawer = () => {
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
          <li>Home</li>
          <li>Content</li>
          <li>Contribute</li>
        </ul>

        <a href="">
          <h2 className="text-center link-underline-dark  aboutus">About us</h2>
        </a>
      </div>

      <button className="p-3 " style={{ border: "none" }}>
        <img
          src="/Assets/bell-outline.svg"
          alt="Notification"
          className="img-fluid"
        />
      </button>
    </div>
  );
}

export default Navbar;
