import React, { useState, useEffect } from "react";
import Social from "./Social.jsx";
import Subject from "./Subject.jsx";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl.js";
import Reviews from "./Reviews.jsx";
import "./pagination.css";
import { FaSearch } from "react-icons/fa";
// import { set } from "date-fns";

function HomePage() {
  const [page, setPage] = useState(1);
  const [data, setIsData] = useState({
    Papers: [],
    totalPages: 1,
  });
  const [error, setIsError] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

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
          `${BackendUrl}/subjects?page=${page}&search=${search}`
        );

        const responsee = response.data;
        setIsData((prevData) => ({
          ...prevData,
          // Pages: responsee.Pages,
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
  }, [page, search]);

  const handleSearch = (searchValue) => {
    setSearch(searchValue.trim());
    setPage(1); // Always gos to page 1 when searching
  };
  // Generating dynamic array based on total pages
  let Pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);

  // Filtered papers
  // const filteredPapers = data.Papers.filter((paper) =>
  //   paper.Subject.toLowerCase().trim().includes(search.toLowerCase().trim())
  // );

  return (
    <>
      <div className="container">
        <Social />

        {/* Searching the paper*/}
        <div className="row d-flex justify-content-center  py-4 mt-5">
          {/* <div className="col"></div> */}
          <div className="col-12 col-md-10 col-lg-8">
            <div className="mb-5">
              <h2 className="text-center fw-bold text-primary mb-2 mt-5">
                Search Exam Papers
              </h2>
              <p className="text-center text-muted">Find papers by name</p>
            </div>
            <div className="search mb-4 bg-gradient-light p-2 text-dark  p-3 rounded input-group  input-group-lg colorbg shadow-sm">
              <span className="input-group-text bg-primary border-0">
                <FaSearch size={24} color="white" />
              </span>
              <input
                type="text"
                placeholder="Search papers"
                className="form-control"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="input-group-text btn btn-primary">
                Search
              </button>
            </div>
          </div>

          <h2 className="fs-2 fw-bolder mt-1">Exam Archives</h2>
        </div>

        {/* showing msg to use */}
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
          {data.Papers && data.Papers.length > 0 ? (
            data.Papers.map((subject, index) => (
              <Subject
                key={subject._id}
                id={subject._id}
                sub={subject.Subject}
                img={Images[index % Images.length]}
              />
            ))
          ) : (
            <div className="text-center">
              {/* <h4 className="fs-5">No Paper Found</h4> */}
              <p className="text-muted">
                {search ? `No results for "${search}"` : "No Papers found"}
              </p>
            </div>
          )}
        </div>

        {/* // <--------------------------- Pagination ----------------------------> */}
        {data.totalPages > 1 && (
          <div className="pagination">
            {Pages.map((p, index) => (
              <button
                key={index}
                onClick={() => {
                  setPage(() => p);
                }}
                className={p === page ? "active" : ""}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        <Reviews />
      </div>
    </>
  );
}

export default HomePage;
