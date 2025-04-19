import React, { useEffect } from "react";
import Testimonials from "./Testimonial.jsx";
const arr = [
  {
    Text: "Absolutely love this platform! The user interface is clean and easy to navigate",
    Name: "Numan",
    Value: 5,
  },
  {
    Text: "Awesome Dear.. Keep it up 💯.",
    Name: "maviya_mubashir",
    Value: 5,
  },
  {
    Text: "Great Initiative",
    Name: "Mir Tanzeel Tawheedi",
    Value: 5,
  },
  {
    Text: "Excellent service! I highly recommend this platform to everyone.",
    Name: "Bob",
    Value: 5,
  },
  {
    Text: "The platform is okay, but it could use some improvements. Sometimes it feels slow.",
    Name: "Charlie",
    Value: 3,
  },
  {
    Text: "I had a terrible experience. The platform crashed multiple times, and I lost my data.",
    Name: "David",
    Value: 1,
  },

  {
    Text: "Absolutely love this platform! The user interface is clean and easy to navigate",
    Name: "Numan",
    Value: 5,
  },
  {
    Text: "Absolutely love this platform! The user interface is clean and easy to navigate",
    Name: "Numan",
    Value: 5,
  },
  {
    Text: "Great Initiative",
    Name: "Mir Tanzeel Tawheedi",
    Value: 5,
  },
];

function TestimonialsPage() {
  return (
    <div className="review-slide">
      {arr.map((item, index) => (
        <Testimonials
          key={index}
          Text={item.Text}
          Name={item.Name}
          Value={item.Value}
        />
      ))}
    </div>
  );
}

export default TestimonialsPage;
