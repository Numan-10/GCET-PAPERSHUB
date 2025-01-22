import React from "react";
import Individual from "./Individual";
import { useNavigate } from "react-router-dom";

function Subject({ sub, img, id }) {
  const Navigate = useNavigate();
  const handleOnClick = () => {
    Navigate(`/home/${id}`);
    // console.log(id);
  };

  return (
    <div className="col-12 col-md-4 mb-4">
      <div
        className="card h-100"
        style={{ borderRadius: "20px", overflow: "hidden" }}
        onClick={handleOnClick}
      >
        <img src={img} className="card-img-top" alt="card" />
        <div className="card-img-overlay d-flex justify-content-center align-items-center">
          <h5 className="text-center text-white fw-bold">{sub}</h5>
        </div>
      </div>
      <Individual id={id} />
    </div>
  );
}

export default Subject;
