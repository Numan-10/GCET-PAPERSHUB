import React, { useState, useEffect } from "react";
import Social from "./social";
import Subject from "./subject";
import axios from "axios";

function HomePage() {
  const [data, setIsData] = useState([]);
  const [error, setIsError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/subjects");
        // console.log("Subjects"+response.data);
        setIsData(response.data);
      } catch (err) {
        setIsError("Failed to load subjects. Please try again.");
        console.log(err);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <>
      <div className="container">
        <Social />
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="row">
          {data.map((subject, index) => (
            <Subject
              key={index}
              id={subject._id}
              sub={subject.Subject}
              img="/Assets/gcet.jpeg"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
