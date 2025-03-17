import React, { useState } from "react";
import "./ShowUnits.css";

function ShowUnits({ id, name, unit, img, sub, pdf }) {
  const [show, setShow] = useState(false);

  const handleOnClick = () => {
    setShow(true);
    console.log(pdf);
  };

  return (
    <div className="col-12 col-md-4">
      <div
        className="card mt-1"
        style={{
          borderRadius: "38px",
          overflow: "hidden",
          width: "auto",
        }}
        onClick={handleOnClick}
      >
        <img src={img} className="card-img-top" alt="card" />
      </div>
      <h5 className="card-title fs-6 mt-2 ps-1 ms-1 ">
        <span className="fw-semibold ps-1"> {unit}</span> : {name}
      </h5>
      <div className={`pdf-container ${show ? "show" : ""}`}>
        <h6 className="mt-2 ms-1">
          <i className="fa-solid fa-file-pdf p-1 ms-2"> </i>
          <a href={pdf} className="text-decoration-none ms-1" target="_blank">
            click me!
          </a>
        </h6>
      </div>
    </div>
  );
}

export default ShowUnits;
