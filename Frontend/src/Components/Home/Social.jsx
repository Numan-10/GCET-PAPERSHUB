import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "./Msg.jsx";

function Social() {
  const Navigate = useNavigate();

  let contribute = () => {
    Navigate("/contributors");
  };

  return (
    <div className="container mt-4 mb-5">
      <Message/>
      <div className="row text-center ">
        <div className="col-4">
          <img
            src="/Assets/Contributors.svg"
            alt="contributors"
            className="SocialHome img-fluid"
            onClick={contribute}
          />
        </div>
        <div className="col-4 ">
          <a
            href="https://github.com/GCET-CSE2022/"
            target="_black"
            style={{ textDecoration: "none" }}
          >
            <img
              src="/Assets/Github.svg"
              alt="contributors"
              className="SocialHome img-fluid"
            />
          </a>
        </div>
        <div className="col-4 ">
          <Link to="/content">
            <img
              src="/Assets/Content.svg"
              alt="contributors"
              className="SocialHome img-fluid"
            />
          </Link>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 mt-md-5">
          <h2 className="fs-2 fw-bolder mt-5">Exam Archives</h2>
        </div>
      </div>
    </div>
  );
}

export default Social;
