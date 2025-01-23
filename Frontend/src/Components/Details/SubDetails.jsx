import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SubDetails() {
  const { id } = useParams();

  const [subject, setSubject] = useState({});
  const [Error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/subjects/${id}`)
      .then((response) => {
        setSubject(response.data);
      })
      .catch((err) => {
        setError("Error fetching Subject details: " + err.message);
      });
  }, [id]);

  if (Error) return <p className="text-danger">{Error}</p>;
  if (!subject.Title)
    return (
      <p className="d-flex justify-content-center align-items-center">
        Loading...
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
          {/* <p className="card-text">Filename: {subject.Pdf.filename}</p> */}
          <a href={subject.Pdf.Url} className="btn btn-primary" target="_blank">
            View PDF
          </a>
        </div>
      </div>
    </div>
  );
}

export default SubDetails;
