import React from "react";

function Contribute({ name, role, src, about }) {
  return (
    <div className="row d-flex align-items-center text-center text-md-start m-0">
      <div className="col-12 col-md-6 d-flex justify-content-center">
        <div
          className="card"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            width: "18rem",
            position: "relative",
          }}
        >
          <img
            src={src}
            className="card-img-top"
            alt="Contributor image"
            style={{ height: "22rem", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              color: "white",
              width: "100%",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{name}</span> <br />
            <span>{role}</span>
          </div>
        </div>
      </div>

      {/* -------------------------> About <--------------------------- */}
      <div className="col-12 col-md-6 mt-4 mt-md-0 text-center text-md-start">
        <h2 className="p-2 text-center text-md-start ">About Me!</h2>
        <p className="px-2 text-center text-md-start">{about}</p>
        <p className="px-2 text-center text-md-start ">
         <i> Want to know more? Feel free to check out the links below.</i>
        </p>
        <div className="ss">
          <div className="SocialsC p-2">
            <div className="iconsC  ">
              <a href="https://github.com/Numan-10" target="_blank">
                <i class="fa-brands fa-github text-dark"></i>
              </a>
            </div>
            <div className="iconsC ">
              <a href="https://linkedin.com/in/numan10" target="_blank">
                <i class="fa-brands fa-linkedin"></i>
              </a>
            </div>
            <div className="iconsC ">
              <a
                href="https://portfolio-seven-silk-82.vercel.app/"
                target="_blank"
              >
                <i
                  class="fa-solid fa-address-card"
                  style={{ color: "#ff9700" }}
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contribute;
