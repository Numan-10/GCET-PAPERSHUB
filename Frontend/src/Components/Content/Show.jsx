import React from "react";
import { useNavigate } from "react-router-dom";
function show({ sub, img, id }) {
  const Navigate = useNavigate();
  const handleOnClick = () => {
    Navigate(`/content/${sub}`);
  };

  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
      <div
        className="card"
        style={{
          borderRadius: "38px",
          overflow: "hidden",
          width: "auto",
        }}
        onClick={handleOnClick}
      >
        <img src={img} className="card-img-top" alt="card" />
        {/* <div className="card-img-overlay">Notes</div> */}
      </div>
      <h5 class="card-title fs-6 mt-2 ps-1 ">
        <b>Subject : </b>
        {sub}
      </h5>
    </div>
  );
}

export default show;
