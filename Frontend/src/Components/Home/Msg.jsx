import React from "react";
import "./pagination.css";

function Msg() {
  return (
    <div className="container mt-3 mb-5 fs-6 text-center bg p-3 rounded text-dark msg d-flex justify-content-center align-items-start md:align-items-center border border-primary-subtle">
      {" "}
      <div className="icon fs-5 me-2  ">
        <i class="fas fa-envelope"></i>
      </div>
      <div className="text-start p-1 ">
        {" "}
        Got useful notes or papers? Help others out—send them to{" "}
        <b>9256fa@gmail.com</b> to get them added to the site!
      </div>
    </div>
  );
}

export default Msg;
