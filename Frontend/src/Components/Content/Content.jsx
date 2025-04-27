import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl";
import Show from "./Show";
import CreateSub from "./Subject/CreateSub";
import "../Home/pagination.css";
import { jwtDecode } from "jwt-decode";

function Content() {
  const BackendUrl = API_BASE_URL;
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    subjects: [],
    totalPages: "",
  });
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const ContentData = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/content?page=${page}`);
        const { subjects, totalPages } = response.data;
        setData({ subjects, totalPages });
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    ContentData();
  }, [page]);

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

  // generating array upto total pages
  const Pages = Array.from({ length: data.totalPages }, (_, i) => i + 1);

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

        <div className="Notes text-center fs-4 fw-bold mt-3 text-decoration-underline mb-3">
          Notes Section
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
          {data.subjects.map((subject, index) => (
            <Show
              key={index}
              id={subject._id}
              sub={subject.subject}
              img={Images[index % Images.length]}
            />
          ))}
        </div>

        <div className="pagination">
          {Pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={p === page ? "active" : ""}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Content;
