import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import TestimonialsPage from "../Testimonials/TestimonialsPage";
import API_BASE_URL from "../../ApiUrl";
const BackendUrl = API_BASE_URL;
function Reviews() {
  const [value, setValue] = useState(1);
  const [comment, setComment] = useState("");
  const [user, setuser] = useState("");

  const location = useLocation();
  useEffect(() => {
    try {
      const currUser = localStorage.getItem("user");
      setuser(currUser);
    } catch (err) {
      console.log(err);
    }
  }, [location.pathname]);

  // ------------------------> Handle Success <-----------------
  const handleSucess = (msg) => {
    toast.success(msg, { duration: 2300 });
  };

  // ------------------------> Handle Error <-------------------
  const handleError = (msg) => {
    toast.error(msg, { duration: 2300 });
  };

  //   ------------------------> Submit <--------------------------
  const submit = async () => {
    if (!value || !comment) {
      return handleError("All fields are required!");
    }
    if (comment) {
      const feed = comment.trim();
      if (feed.length < 30) {
        return handleError("Comment must be 30+ chars.");
      }
    }
    try {
      const response = await axios.post(
        `${BackendUrl}/review`,
        {
          value,
          comment,
          user,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const { message, success } = response.data;

      if (success) {
        setValue(1);
        setComment("");
        handleSucess(message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err?.response?.data?.message || err);
    }
  };
  const handleChange = (evt) => {
    setComment(evt.target.value);
  };
  return (
    <>
      <hr className="mt-5" />
      <div className="position-relative  d-flex justify-content-center align-items-center">
        <h1 className="text-center mt-5 TestHeading mb-10">Testimonials</h1>
        <div className="position-absolute Testimonial-text top-0 start-0 text-center md:d-flex justify-content-center align-items-center ">
          <img
            src="/Assets/Testimonials.svg"
            alt="testimonials"
            className="img-fluid "
            style={{ width: "100%", height: "15rem"}}
          />
        </div>
      </div>

      {/* ------------------------------> Testimonials component Here <--------------------------------- */}
      <TestimonialsPage />
      {user && (
        <div className="container mt-0 pt-2">
          <hr />
          <div className="p-1">
            <h3>Submit Your Feedback</h3>
            <p className="fst-italic">Rate your experience. Your feedback matters!</p>
          </div>

          {/*------------------------> Ratings <---------------------*/}

          <Box sx={{ "& > legend": { mt: 2 } }}>
            <Rating
              name="rating"
              value={value}
              id="Rating"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
          <div className="p-1">
            <h6 className=" mt-3">Comment</h6>
            <div className="form-floating">
              <textarea
                name="comment"
                id="comment"
                className="form-control p-2"
                value={comment}
                onChange={handleChange}
              ></textarea>
            </div>
            <button className="btn btn-dark mt-3" onClick={submit}>
              Submit
            </button>
          </div>
          <Toaster />
        </div>
      )}
    </>
  );
}

export default Reviews;
