import React from "react";
import { useNavigate } from "react-router-dom";
function show({ sub, img, id }) {
  // console.log(sub, img, id);
  const Navigate = useNavigate();
  const handleOnClick = () => {
    Navigate(`/content/${sub}`);
    console.log(id);
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
        <b>Subject : </b>
        {sub}
      </h5>
    </div>
  );
}

export default show;
