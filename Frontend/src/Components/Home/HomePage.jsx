import React, { useState, useEffect } from "react";
import Social from "./social";
import Subject from "./subject";
import axios from "axios";
import Pagination from "./Pagination";

function HomePage() {
  const [data, setIsData] = useState([]);
  const [error, setIsError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/subjects");
        console.log(response.data);
        setIsData(response.data);
      } catch (err) {
        setIsError("Failed to load subjects. Please try again.");
        console.log(err);
      }
    };

    fetchSubjects();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="container">
        <Social />
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="row">
          {currentPosts.map((subject, index) => (
            <Subject
              key={index}
              id={subject._id}
              sub={subject.Subject}
              img="/Assets/gcet.jpeg"
            />
          ))}
          <Pagination
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
