import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl";
import Show from "./Show";
import CreateSub from "./Subject/CreateSub";
import "../Home/pagination.css";
import { jwtDecode } from "jwt-decode";

function Content() {
  const Navigate = useNavigate();
  const BackendUrl = API_BASE_URL;
  const [data, setData] = useState({
    page: 1,
    subjects: [],
    totalPages: "",
    Pages: [],
  });
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const ContentData = async () => {
      try {
        const responsee = await axios.get(
          `${BackendUrl}/content?page=${data.page}`
        );
        // console.log(response.data.subjects);
        const response = responsee.data;
        setData((prev) => ({
          ...prev,
          page: response.page,
          subjects: response.subjects,
          totalPages: response.totalPages,
          Pages: response.Pages,
        }));
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    ContentData();
  }, [data.page]); //data.subjects

  const Images = [
    "/Assets/Frame 77 (1).svg",
    "/Assets/Frame 78.svg",
    "/Assets/Frame 80.svg",
  ];

  //-------------> Showing the + sign to the specific User-> for adding Subjects <-------------------
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
        console.error("Invalid token:", error);
        localStorage.clear();
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  }, []);
  // ------------------------------------->End!<------------------------------------

  return (
    <>
      <div className="container">
        {userData?.id === import.meta.env.VITE_APP_ID && (
          <div className="text-center mt-2 ">
            <i
              class="fa-solid fa-circle-plus fa-2x"
              onClick={() => setShow(!show)}
            ></i>
          </div>
        )}

        {/* Create form  */}
        {show && <CreateSub onClose={() => setShow(false)} />}

        <div className="Notes text-center fs-4 fw-bold mt-3 text-decoration-underline mb-3 ">
          Notes Section
        </div>

        {/* Display Error messages */}
        {Error && <p className="text-danger text-center">{Error}</p>}
        {/* Display spinner unitil data comes */}
        {loading && (
          <p className="text-center mt-5">
            {" "}
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </p>
        )}

        {/* MAin Data  */}
        <div className="row">
          {data.subjects.map((data, index) => (
            // console.log(data,index)
            <Show
              key={index}
              id={data._id}
              sub={data.subject}
              img={Images[index % Images.length]}
            />
          ))}
        </div>
        <div className="pagination">
          {data.Pages.map((page, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setData((prev) => ({ ...prev, page: page }));
                }}
                className={page === data.page ? "active" : ""}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default Content;
