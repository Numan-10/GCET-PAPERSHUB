import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl";
import Show from "./Show";
import CreateSub from "./Subject/CreateSub";
import "../Home/pagination.css";
import { jwtDecode } from "jwt-decode";
import { FaSearch } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
function Content() {
  const BackendUrl = API_BASE_URL;
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    subjects: [],
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const ContentData = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/content?page=${page}&search=${search}`
        );
        const { subjects, totalPages } = response.data;
        console.log(response.data);
        setData({ subjects, totalPages });
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    ContentData();
  }, [page, search]);

  const Images = [
    "/Assets/Frame 77 (1).svg",
    "/Assets/Frame 78.svg",
    "/Assets/Frame 80.svg",
  ];

  // Showing the + sign to the speific User
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (storedUser && storedEmail && token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.clear();
          setUserData(null);
          return;
        }
        setUserData({
          User: storedUser,
          Email: storedEmail,
          id: decodedToken.id || null,
        });
      } catch (error) {
        localStorage.clear();
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  }, []);

  const handleSearch = (searchValue) => {
    setSearch(searchValue.trim());
    setPage(1);
  };

  const handleChange = (event, Value) => {
    setPage(Value);
    window.scrollTo(0, 400);
  };
  return (
    <>
      <div className="container">
        {userData?.id === import.meta.env.VITE_APP_ID && (
          <div className="text-center">
            <i
              className="fa-solid fa-circle-plus fa-2x"
              onClick={() => setShow(!show)}
            ></i>
          </div>
        )}

        {show && <CreateSub onClose={() => setShow(false)} />}

        {/* Search functionality */}
        <div className="row d-flex justify-content-center py-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="mb-3">
              <h2 className="text-center fw-bold text-primary mb-2 ">
                Search Semester Notes
              </h2>
              <p className="text-center text-muted">Find notes by name</p>
            </div>
            <div className="search mb-4 colorbg p-2 text-dark  p-3 rounded input-group  ">
              <span class="input-group-text bg-primary border-0">
                <FaSearch size={20} color="white" />
              </span>
              <input
                type="text"
                placeholder="Search notes"
                className="form-control"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {Error && <p className="text-danger text-center">{Error}</p>}
        {loading && (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="row">
          {data.subjects && data.subjects.length > 0 ? (
            data.subjects.map((subject, index) => (
              <Show
                key={index}
                id={subject._id}
                sub={subject.subject}
                img={Images[index % Images.length]}
              />
            ))
          ) : (
            <div className="text-center">
              <p className="text-muted">
                {search ? `No results for "${search}"` : "No Papers found"}
              </p>
            </div>
          )}
        </div>
        {/* -------------pagination------------- */}

        {data.totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center mt-2">
            <Stack spacing={2}>
              <Pagination
                count={data.totalPages}
                page={page}
                onChange={handleChange}
                color="secondary"
                size="large"
              />
            </Stack>
          </div>
        )}
      </div>
    </>
  );
}

export default Content;
