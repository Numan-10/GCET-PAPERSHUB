import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const Navigate = useNavigate();

  let home = () => {
    Navigate("/home");
  };

  return (
    <>
      <div className="gcet img-fluid position-relative" style={{ minHeight: "100vh" }}>
        {/* Overlay */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)", // semi-transparent black
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        ></div>

        <div
          className="container vh-100 d-flex justify-content-center align-items-center position-relative"
          style={{ zIndex: 2 }}
        >
          <div className="text-center text-white">
            <div className="mb-5">
              <h2 className="GCET title">GCET</h2>
              <h2 className="GCET">UNOFFICIAL</h2>
            </div>

            <div>
              <button
                className="btn mt-5 px-5 py-2 fw-bold rounded-5 text-white shadow-lg"
                onClick={home}
                style={{
                  background:
                    "linear-gradient(90deg, rgb(206, 200, 117), rgb(123, 91, 197))",
                }}
              >
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
