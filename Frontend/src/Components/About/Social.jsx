import React from "react";

function Social() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 p-1 text-center Home ">Home</div>
        <p className="text-center mt-1 join">
          JOIN US AND LET'S EXPLORE TOGETHER
        </p>
      </div>
      <div className="row text-center ">
        <div className="socials d-flex justify-content-center">
          <div className="p-2">
            <i class="fa-brands fa-github"></i> |
          </div>
          <div className="p-2">
          <i class="fa-brands fa-whatsapp"></i> |
          </div>
          <div className="p-2">
            <i class="fa-brands fa-discord"></i> |
          </div>
          <div className="p-2">
            <i class="fa-brands fa-telegram"></i> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Social;
