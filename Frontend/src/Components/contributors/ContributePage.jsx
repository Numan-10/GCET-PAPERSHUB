import React from "react";
import Contribute from "./Contribute";
function ContributePage() {
  return (
    <>
      <div className="container d-flex justify-content-evenly align-items-center mt-5">
        <div className="row">
          <Contribute
            name={"Numan"}
            role={"Full-Stack developer"}
            src={"/Assets/numan.png"}
            about={"Hi, I’m Numan, a CS student at GCET Kashmir and the creator of this platform. I built this project to provide easy access to college notes and previous year papers, helping students prepare efficiently. My goal is to make studying simpler and more organized for everyone."}
          />
        </div>
      </div>
    </>
  );
}

export default ContributePage;
