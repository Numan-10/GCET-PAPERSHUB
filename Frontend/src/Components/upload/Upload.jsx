import React, { useEffect, useState } from "react";
import axios from "axios";

function Upload() {
  const [inputValue, setIsInputValue] = useState({
    Title: "",
    Subject: "",
    Semester: "",
  });
  const { Title, Subject, Semester } = inputValue;

  const handleOnChange = (evt) => {
    // console.log(evt)
    const { name, value } = evt.target;
    setIsInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inputValue);
      const Data = await axios.post(
        "http://localhost:3000/upload",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(Data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-1"></div>
        <div className="col mt-5">
          <h1 className="text-center">Upload Paper</h1>
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                value={Title}
                onChange={handleOnChange}
                name="Title"
                id="title"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                value={Subject}
                onChange={handleOnChange}
                name="Subject"
                className="form-control"
                id="subject"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sem" className="form-label">
                Semester
              </label>
              <input
                type="text"
                value={Semester}
                onChange={handleOnChange}
                name="Semester"
                id="sem"
                className="form-control"
              />
            </div>
            <div>
              <button type="submit" className="btn btn-success mb-5">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default Upload;
