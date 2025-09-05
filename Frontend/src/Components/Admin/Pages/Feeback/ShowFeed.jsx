import { useState, useEffect } from "react";
import axios from "axios";
import Feedback from "./Feedback";
import { FaUserCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
const ShowFeed = () => {
  const [feedbacks, setFeedbacks] = useState([{}]);

  const fetchReviews = async () => {
    const response = await axios.get("http://localhost:3000/review");
    setFeedbacks(response.data.feedbacks.reverse());
    console.log(feedbacks);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const DeleteFeed = async (id) => {
    // console.log(id);
    const toastId = toast.loading("Deleting Feedback...");
    try {
      const response = await axios.delete(`http://localhost:3000/review/${id}`);
      const filteredReviews = feedbacks.filter((feed) => feed._id != id);
      toast.success("Feedback Deleted!", { id: toastId });
      setFeedbacks(filteredReviews);
      console.log(response.data);
    } catch (err) {
      toast.error("Failed to delete!", { id: toastId });
      console.error(err);
    }
  };

  return (
    <div className="container py-4 d-flex flex-column align-items-center">
      <h2 className="fw-bold mb-4">User Feedbacks</h2>
      <div className="row g-4 justify-content-center w-100">
        {feedbacks.map((feed, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <Feedback
              image={<FaUserCircle size={40} color="#555" />}
              name={feed.author}
              rating={feed.rating}
              text={feed.comment}
              time={feed.createdAt}
              id={feed._id}
              feedbacks={feedbacks}
              onDelete={DeleteFeed}
            />
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default ShowFeed;
