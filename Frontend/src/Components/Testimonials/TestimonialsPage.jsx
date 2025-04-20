import React, { useEffect } from "react";
import Testimonials from "./Testimonial.jsx";
const arr = [
  {
    Text: "Finally a proper place for notes and papers. Life-saver!",
    Name: "Usman",
    Value: 5,
  },
  {
    Text: "Awesome Dear.. Keep it up 💯.",
    Name: "maviya_mubashir",
    Value: 5,
  },
  {
    Text: "This should’ve existed way earlier. Much needed for GCETians!",
    Name: "Saima",
    Value: 4,
  },
  {
    Text: "Great Initiative",
    Name: "Mir Tanzeel Tawheedi",
    Value: 5,
  },
  {
    Text: "Great site for GCET students! Easy access to notes and study materials. Keep it up! 😀",
    Name: "Sadath",
    Value: 5,
  },

  {
    Text: "Really great initiative ✨",
    Name: "Asad Aabid",
    Value: 5,
  },

  {
    Text: "Finally a proper place for notes and papers. Life-saver!",
    Name: "Usman",
    Value: 5,
  },
  {
    Text: "Awesome Dear.. Keep it up 💯.",
    Name: "maviya_mubashir",
    Value: 5,
  },
  {
    Text: "This should’ve existed way earlier. Much needed for GCETians!",
    Name: "Saima",
    Value: 4,
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
