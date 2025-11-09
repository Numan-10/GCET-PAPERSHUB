import React, { useState } from "react";
import {
  FaBug,
  FaPaperPlane,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl";

const Report = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "ui",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Submitting bug report...");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/bug-report`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const { message, success } = response.data;
      if (success) {
        toast.success(message || "Bug reported successfully", { id: toastId });
        // Reset form only on success
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          category: "ui",
          email: "",
        });
      } else {
        toast.error(message || "Failed to report bug", { id: toastId });
      }
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <Toaster position="top-center" />

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="text-center mb-4">
                <FaBug size={40} className="text-danger mb-3" />
                <h4 className="card-title mb-2">Report a Bug</h4>
                <p className="text-muted">
                  Help us improve by reporting issues you encounter
                </p>
              </div>

              {/*---------------> Form <------------------*/}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="title">
                    Bug Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Brief description of the bug"
                    id="title"
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe the bug in detail. Include steps to reproduce if possible..."
                  ></textarea>
                </div>

                {/* Priority and Category Row */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Priority</label>
                    <select
                      className="form-select"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                      <option value="critical">⚫ Critical</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="ui">🎨 UI/Design</option>
                      <option value="functionality">⚙️ Functionality</option>
                      <option value="performance">🚀 Performance</option>
                      <option value="security">🔒 Security</option>
                      <option value="other">📋 Other</option>
                    </select>
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email for follow-up"
                  />
                  <div className="form-text">
                    <FaInfoCircle className="me-1" />
                    We'll contact you if we need more information
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-danger btn-md"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Submit
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Help Text */}
              <div className="mt-4 p-3 bg-light rounded">
                <div className="d-flex align-items-start gap-2">
                  <FaExclamationTriangle className="text-warning mt-1" />
                  <div>
                    <strong className="d-block">Reporting Tips:</strong>
                    <ul className="small mb-0 mt-2 ps-3">
                      <li>Describe exactly what happened</li>
                      <li>List the steps you took before the issue</li>
                      <li>Tell us what you expected instead</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
