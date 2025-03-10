import React, { useState, useEffect } from "react";
import Social from "./Social.jsx";
import Subject from "./Subject.jsx";
import axios from "axios";
import Pagination from "./Pagination";
import API_BASE_URL from "../../ApiUrl.js";
import Reviews from "./Reviews.jsx";

function HomePage() {
  const [data, setIsData] = useState([]);
  const [error, setIsError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [loading, setIsLoading] = useState(true);

  const Images = [
    "/Assets/Frame 77 (1).svg",
    "/Assets/Frame 78.svg",
    "/Assets/Frame 80.svg",
  ];

  const BackendUrl = API_BASE_URL;
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/subjects`);
        // console.log(response.data);
        setIsData(response.data);
      } catch (err) {
        setIsError("Failed to load subjects. Please try again.");
        console.log(err);
      } finally {
        setIsLoading(false); ///always executes
      }
    };

    fetchSubjects();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);
  // console.log("Backend URL:", import.meta.env.VITE_APP_BACKEND_URL);

  return (
    <>
      <div className="container">
        <Social />
        {error && <p className="text-danger text-center">{error}</p>}
        {loading && (
          <>
            <p className="text-center">
              {" "}
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </p>
            <p className="text-center fw-medium">
              <b>Note:</b> Using Render free service, backend starting (30-40s).
              Please stay on this page—this will disappear once ready. 😊
            </p>
          </>
        )}
        <div className="row">
          {currentPosts.map((subject, index) => (
            <Subject
              key={index}
              id={subject._id}
              sub={subject.Subject}
              img={Images[index % Images.length]}
              // img={getRandomImage()}
            />
          ))}
          <Pagination
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
        <Reviews />
      </div>
    </>
  );
}

export default HomePage;
