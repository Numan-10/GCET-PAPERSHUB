import React from "react";
import Social from "./social";
import Subject from "./subject";

function HomePage() {
  return (
    <>
      <div className="container">
        <Social />
        <div className="row">
          <Subject sub={"Signals & Systems"} img="/Assets/gcet.jpeg" />
          <Subject sub={"Web Development"} img="/Assets/gcet.jpeg" />
          <Subject sub={"Object Oriented Prog"} img="/Assets/gcet.jpeg" />
          <Subject sub={"Object Oriented Prog"} img="/Assets/gcet.jpeg" />
          <Subject sub={"Object Oriented Prog"} img="/Assets/gcet.jpeg" />
          <Subject sub={"Object Oriented Prog"} img="/Assets/gcet.jpeg" />
          <Subject sub={"Object Oriented Prog"} img="/Assets/gcet.jpeg" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
