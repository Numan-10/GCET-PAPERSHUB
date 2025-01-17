import React from "react";
function Subject({ sub, img }) {
  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card h-100" style={{ borderRadius: "20px", overflow: "hidden" }}>
        <img src={img} className="card-img-top" alt="card" />
        <div className="card-img-overlay d-flex justify-content-center align-items-center">
          <h5 className="text-center text-white fw-bold">{sub}</h5>
        </div>
      </div>
    </div>
  );
}

export default Subject;
