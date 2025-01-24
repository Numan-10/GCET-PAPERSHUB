import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState({});
  const [Error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/subjects/${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        if (response.data.status === false) {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 1500,
            onClose: () => navigate("/login"),
          });
          return;
        } else {
          setSubject(response.data);
        }
      })
      .catch((err) => {
        setError("Error fetching Subject details: " + err.message);
        toast.error("Unable to fetch, Login again.", {
          position: "top-center",
          autoClose: 1500,
          onClose: () => navigate("/login"),
        });
      });
  }, [id, navigate]);

  if (Error)
    return (
      <p className="text-danger text-center mt-5">
        {Error}
        <ToastContainer />
      </p>
    );

  if (!subject.Title)
    return (
      <p className="d-flex justify-content-center align-items-center mt-5">
        Loading...
        <ToastContainer />
      </p>
    );

  return (
    <div className="container mt-4 mb-5 d-flex justify-content-center align-items-center flex-column">
      <h2 className="text-center">Subject Details</h2>
      <div
        className="card mt-3"
        style={{ width: "18rem", borderRadius: "12px", overflow: "hidden" }}
      >
        <img src="/Assets/gcet.jpeg" className="card-img-top" alt="Subject" />
        <div className="card-body">
          <h5 className="card-title">{subject.Title}</h5>
          <p className="card-text">Subject: {subject.Subject}</p>
          <p className="card-text">Semester: {subject.Semester}</p>
          <a href={subject.Pdf.Url} className="btn btn-primary" target="_blank">
            View PDF
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SubDetails;
