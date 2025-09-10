import React, { useState, useEffect } from "react";
import Update from "./Update";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl";
import toast, { Toaster } from "react-hot-toast";

function UpdatePage() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications`);

      if (response.data.success) {
        setUpdates(response.data.notifications.reverse());
      } else {
        setUpdates([]);
      }
    } catch (error) {
      console.error("Failed to fetch updates:", error);
      toast.error("Failed to load updates");
      setUpdates([]);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="text-muted">Loading updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h3 className="text-center mb-4 fw-bold">Updates</h3>

          {updates.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No updates available at the moment.</p>
            </div>
          ) : (
            updates.map((update) => (
              <Update
                key={update._id}
                msg={update.message}
                link={update.link}
              />
            ))
          )}

          <div className="">
            <h2
              className="text-center mt-5 mb-5"
              style={{ fontWeight: "bolder" }}
            >
              ALL CAUGHT UP!
            </h2>
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

export default UpdatePage;
