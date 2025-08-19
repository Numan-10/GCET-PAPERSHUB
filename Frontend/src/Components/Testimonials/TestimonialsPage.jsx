import React, { useEffect } from "react";
import Testimonials from "./Testimonial.jsx";
const arr = [
  {
    Text: "This is top-tier work by Numan. The site looks professional and will be super helpful for GCET students. Amazing effort!",
    Name: "Usman",
    Value: 5,
  },
  {
    Text: "Awesome Dear.. Keep it up 💯. Your work is inspiring and will surely help many students. Wishing you even more success ahead!",
    Name: "maviya_mubashir",
    Value: 5,
  },
  {
    Text: "This should’ve existed way earlier. Much needed for GCETians! Students will benefit a lot from this amazing platform. Great work!",
    Name: "Saima",
    Value: 4,
  },
  {
    Text: "Great Initiative! It's awesome to see such dedication towards students. Hoping this site keeps growing and helping future batches!",
    Name: "Mir Tanzeel Tawheedi",
    Value: 5,
  },
  {
    Text: "Great site for GCET students! Easy access to notes and study materials. Keep it up! 😀 Waiting for more helpful updates soon!",
    Name: "Sadath",
    Value: 5,
  },
  {
    Text: "Really great initiative ✨. The website design and resources are very helpful. Keep expanding and helping GCET students grow!",
    Name: "Asad Aabid",
    Value: 5,
  },
  {
    Text: "This is top-tier work by Numan. The site looks professional and will be super helpful for GCET students. Amazing effort!",
    Name: "Usman",
    Value: 5,
  },
  {
    Text: "Awesome Dear.. Keep it up 💯. Your work is inspiring and will surely help many students. Wishing you even more success ahead!",
    Name: "maviya_mubashir",
    Value: 5,
  },
  {
    Text: "This should’ve existed way earlier. Much needed for GCETians! Students will benefit a lot from this amazing platform. Great work!",
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
