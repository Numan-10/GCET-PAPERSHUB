import React, { useState, useEffect } from "react";
import Social from "./Social.jsx";
import Subject from "./Subject.jsx";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl.js";
import Reviews from "./Reviews.jsx";
import "./pagination.css";

function HomePage() {
  const [page, setPage] = useState(1);
  const [data, setIsData] = useState({
    Papers: [],
    totalPages: "",
  });
  const [error, setIsError] = useState("");
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
        const response = await axios.get(
          `${BackendUrl}/subjects?page=${page}`
        );

        const responsee = response.data;
        setIsData((prevData) => ({
          ...prevData,
          Pages: responsee.Pages,
          Papers: responsee.Papers,
          page: responsee.page,
          totalPages: responsee.totalPages,
        }));
        setIsLoading(false);
      } catch (err) {
        setIsError("Failed to load subjects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, [page]);

  // Generating dynamic array based on total pages
  let Pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);
  return (
    <>
      <div className="container">
        <Social />
        {error && <p className="text-danger text-center">{error}</p>}
        {loading && (
          <>
            <p className="text-center">
              {" "}
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </p>
            <p className="text-center fw-medium">
              <b>Note:</b> Using Render free service, backend starting (30-40s).
              Please stay on this page—this will disappear once ready. 😊
            </p>
          </>
        )}
        <div className="row">
          {data.Papers.map((subject, index) => (
            <Subject
              key={index}
              id={subject._id}
              sub={subject.Subject}
              img={Images[index % Images.length]}
            />
          ))}
        </div>

        {/* // <--------------------------- Pagination ----------------------------> */}

        <div className="pagination">
          {Pages.map((p) => (
            <button
              onClick={() => {
                setPage(() => p);
              }}
              className={p == page ? "active" : ""}
            >
              {p}
            </button>
          ))}
        </div>

        <Reviews />
      </div>
    </>
  );
}

export default HomePage;
