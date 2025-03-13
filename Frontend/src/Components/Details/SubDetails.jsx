import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../ApiUrl.js";
function SubDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState({});

  useEffect(() => {
    const BackendUrl = API_BASE_URL;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/subjects/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        // axios.get(`http://localhost:3000/subjects/${id}`)
        setSubject(response.data);
        // console.log(response.data);
      } catch (err) {
        console.log(err);
        navigate("/login");
        setTimeout(() => {
          toast.error(err?.response?.data?.message || "Error Occured", {
            duration: 5000,
            position: "top-center",
          });
        }, 250);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (!subject.Title)
    return (
      <div
        class="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container mt-5 mb-5">
      <div className="row ">
        <div className="col-1"></div>
        <div className="col d-flex flex-column align-items-center">
          <h3 className="fw-semibold">{subject.Title}</h3>
          <div>
            <img
              src="/Assets/gcet.png"
              className=" rounded img-fluid"
              alt="Subject"
              style={{ height: "250px", objectFit: "cover" }}
            />
            <div>
              <p className="text-muted mt-2">Subject: {subject.Subject}</p>
              <p className="text-muted">Semester: {subject.Semester}</p>
              <a
                href={subject.Pdf?.Url}
                className="btn btn-primary "
                target="_blank"
              >
                <i className="fa-solid fa-file-pdf"></i> View PDF
              </a>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>

      <Toaster />
    </div>
  );
}

export default SubDetails;
