import React from "react";
function About() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 style={{fontWeight:"bolder"}} className="heading " >Together Strong !</h1>
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col-12 col-md-4">
          <p className="text-center p-2">
            Our mission is to empower students by providing a user-friendly
            notes- sharing platform.We aim to simplify the learning process
            ,foster collaboration,and create a supportive community.
          </p>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default About;
