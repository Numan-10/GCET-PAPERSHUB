import React from "react";
function Navbar() {
  return (
  <div className="Navbar d-flex justify-content-between">
    <div className="p-3">
      <img src="/Assets/More.svg" alt="Hamburger" className="img-fluid" />
    </div>
    
    <div className="p-3">
      <img src="/Assets/bell-outline.svg" alt="Notification" className="img-fluid" />
    </div>
  </div>
) ;
}

export default Navbar;
