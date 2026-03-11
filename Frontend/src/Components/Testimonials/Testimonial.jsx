import React from "react";
import Rating from "@mui/material/Rating";

function Testimonials({ Text, Name, Value }) {
  return (
    <div className="logo-card">
      <div className="testimonial-card">
        <p className="testimonial-text">{Text}</p>
        <Rating name="read-only" className="mt-1" value={Value} readOnly />
        <h6 className="testimonial-name mt-2 mb-0">{Name}</h6>
      </div>
    </div>
  );
}

export default Testimonials;
