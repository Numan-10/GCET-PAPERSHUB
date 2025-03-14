import React from "react";
import { useNavigate } from "react-router-dom";
function ShowUnits({ id, name, unit, img, sub }) {
  const Navigate = useNavigate();
  const handleOnClick = () => {
    Navigate(`/content/${sub}/${id}`);
    console.log(id);
    // console.log(sub);
  };
  
  return (
    <div className="col-12 col-md-4 mb-4">
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
      </div>
      <h5 class="card-title fs-6 mt-2 ps-1 ">
        <span className="fw-semibold ps-1">{name} </span> : {unit}
      </h5>
    </div>
  );
}
export default ShowUnits;
