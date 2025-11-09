import { useState, useEffect } from "react";
import axios from "axios";
import Feedback from "./Feedback";
import { FaUserCircle } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../../ApiUrl";

const ShowFeed = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/review`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setFeedbacks(data.feedbacks.reverse());
    } catch (err) {
      console.error("Error fetching reviews:", err);
      toast.error("Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting Feedback...");
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/review/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      if (data.success) {
        setFeedbacks((prev) => prev.filter((f) => f._id !== id));
        toast.success(data.message, { id: toastId });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete!", {
        id: toastId,
      });
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div
        className="container-fluid p-3 p-md-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
          />
          <p className="text-muted mt-3 mb-0">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-3 p-md-4">
      <Toaster position="top-center" />

      {/* ===== Header ===== */}
      <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
        <MdFeedback size={30} className="text-primary" />
        <h2 className="fw-bold mb-0">User Feedbacks</h2>
        <span className="badge bg-primary fs-6">{feedbacks.length}</span>
      </div>

      {/* ===== Feedback Grid ===== */}
      {feedbacks.length > 0 ? (
        <div className="row g-3 g-md-4">
          {feedbacks.map((feed) => (
            <div key={feed._id} className="col-12 col-sm-6 col-md-6 col-lg-4">
              <Feedback
                image={<FaUserCircle size={42} color="#555" />}
                name={feed.author}
                rating={feed.rating}
                text={feed.comment}
                time={feed.createdAt}
                id={feed._id}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded shadow p-4 p-md-5 text-center">
          <MdFeedback size={70} className="text-muted opacity-50 mb-3" />
          <h5 className="text-muted mb-1">No Feedbacks Yet</h5>
          <p className="text-muted small mb-0">
            User feedbacks will appear here once submitted.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowFeed;
