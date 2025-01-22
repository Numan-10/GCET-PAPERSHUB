import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Upload() {
  const Navigate = useNavigate();

  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        Navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:3000/verify",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), Navigate("/login"));
    };
    verifyCookie();
  }, [cookies, Navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    Navigate("/signup");
  };

  const [inputValue, setIsInputValue] = useState({
    Title: "",
    Subject: "",
    Semester: "",
    Pdf: null,
  });

  const [isloading, setisLoading] = useState(false);

  const { Title, Subject, Semester, Pdf } = inputValue;

  const handleOnChange = (evt) => {
    console.log(evt);
    const { name, value, files } = evt.target;
    if (name === "Pdf") {
      console.log(evt);
      setIsInputValue({
        ...inputValue,
        [name]: files[0],
      });
    } else {
      setIsInputValue({
        ...inputValue,
        [name]: value,
      });
    }
  };

  //Toast
  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
    });
  };
  const handleError = (msg) => {
    toast.error(msg, {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    if (!Title || !Subject || !Semester || !Pdf) {
      handleError("All fields are required!");
      setisLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("paper[Title]", Title);
    formData.append("paper[Subject]", Subject);
    formData.append("paper[Semester]", Semester);
    formData.append("Pdf", Pdf);

    try {
      console.log(formData);
      const Data = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //Destructuring Data
      const { success, message } = Data.data;
      setisLoading(false);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          Navigate("/Upload");
        }, 1000);
      } else {
        handleError(message);
      }
      // console.log(Data);
      //Reseting the values
      setIsInputValue({
        ...inputValue,
        Title: "",
        Subject: "",
        Semester: "",
        Pdf: null,
        // Pdf: "",
      });
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
          <form
            method="post"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
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
            <div className="row">
              <div className="col-12 col-md-6">
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
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Upload pdf
                  </label>
                  <input
                    type="file"
                    onChange={handleOnChange}
                    name="Pdf"
                    className="form-control"
                    id="file"
                  />
                </div>
              </div>
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

            {isloading ? (
              <button class="btn btn-success mb-5" type="button" disabled>
                <span role="status">Uploading...</span> &nbsp;
                <span
                  class="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
              </button>
            ) : (
              <button type="submit" className="btn btn-success mb-5">
                Submit
              </button>
            )}
          </form>
        </div>
        <div className="col-1"></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Upload;
