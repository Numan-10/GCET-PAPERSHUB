import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import axios from "axios";
import Typography from "@mui/material/Typography";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

function Reviews() {
  const [value, setValue] = React.useState(1);
  const [comment, setComment] = React.useState("");
  const [user, setuser] = React.useState("");

  const location = useLocation();
  React.useEffect(() => {
    try {
      const currUser = localStorage.getItem("user");
      setuser(currUser);
      console.log(currUser);
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
    // console.log(value, comment);
    if (!value || !comment) {
      return handleError("All fields are required!");
    }
    if (comment) {
      const feed = comment.trim();
      if (feed.length < 15) {
        return handleError("Comment must be 20+ chars.");
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/review",
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
      console.log("Response:" + response.data);
      const { message, success } = response.data;

      if (success) {
        setValue(1);
        setComment("");
        handleSucess(message);
      } else {
        handleError(message);
      }
    } catch (err) {
      console.log(err);
      handleError(err?.response?.data?.message);
    }
  };
  const handleChange = (evt) => {
    // console.log(evt.target.value);
    setComment(evt.target.value);
  };
  return (
    <div className="container mt-5 pt-2">
      <hr />
      <div className="p-1">
        <h3>Leave a Review</h3>
        <p>Rating</p>
      </div>

      {/*------------------------> Ratings <---------------------*/}

      <Box sx={{ "& > legend": { mt: 2 } }}>
        {/* <Typography component="legend">Controlled</Typography> */}
        <Rating
          name="rating"
          value={value}
          id="Rating"
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        {/* <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly /> */}
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
  );
}

export default Reviews;
