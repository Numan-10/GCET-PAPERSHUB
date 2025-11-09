import React, { useState, useEffect } from "react";
import { FaBug, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../../ApiUrl";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/FetchBugs`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const { reports, success } = response.data;
      if (success) {
        console.log(reports);
        setReports(reports);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting report...");
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/delete/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const { success } = response.data;
      if (success) {
        setReports(reports.filter((report) => report._id !== id));
        toast.success("Report deleted", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message, { id: toastId });
      setLoading(false);
    }
  };

  // Filter reports based on priority
  const filteredReports = reports.filter((report) => {
    return priorityFilter === "" || report.priority === priorityFilter;
  });

  if (loading) {
    return (
      <div className="container-fluid py-3">
        <div className="card shadow-sm">
          <div className="card-body text-center">
            <div className="spinner-border text-primary"></div>
            <p className="mt-2">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3">
      <Toaster position="top-center" />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3 d-flex align-items-center gap-2">
            <FaBug className="text-danger" />
            Bug Reports ({filteredReports.length})
          </h5>

          {/* Priority Filter */}
          <div className="mb-3">
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ maxWidth: "200px" }}
            >
              <option value="">All Priorities</option>
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
              <option value="critical">⚫ Critical</option>
            </select>
          </div>

          {/* Desktop Table */}
          <div className="d-none d-md-block">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report._id}>
                    <td className="fw-semibold">{report.title}</td>
                    <td>
                      <span
                        className="text-truncate d-inline-block"
                        style={{ maxWidth: "200px" }}
                      >
                        {report.description}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          report.priority === "critical"
                            ? "bg-danger"
                            : report.priority === "high"
                            ? "bg-warning"
                            : report.priority === "medium"
                            ? "bg-secondary"
                            : "bg-info"
                        }`}
                      >
                        {report.priority}
                      </span>
                    </td>
                    <td>
                      {report.email ? (
                        <span className="small">{report.email}</span>
                      ) : (
                        <span className="text-muted small">Anonymous</span>
                      )}
                    </td>
                    <td className="small text-muted">
                      {new Date(report.CreatedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(report._id)}
                        disabled={loading}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="d-block d-md-none">
            {filteredReports.map((report) => (
              <div className="card mb-3" key={report._id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="card-title fw-bold mb-1">{report.title}</h6>
                    <span
                      className={`badge ${
                        report.priority === "critical"
                          ? "bg-danger"
                          : report.priority === "high"
                          ? "bg-warning"
                          : report.priority === "medium"
                          ? "bg-secondary"
                          : "bg-info"
                      }`}
                    >
                      {report.priority}
                    </span>
                  </div>

                  <p className="card-text text-muted small mb-2">
                    {report.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="small text-muted">
                      {report.email ? ` ${report.email}` : " Anonymous"}
                    </span>
                    <span className="small text-muted">
                      {new Date(report.CreatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(report._id)}
                    disabled={loading}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">
                <FaBug size={60} color="grey" opacity={0.8} />
              </p>
              <p className="text-muted">
                No bug reports found{" "}
                {priorityFilter && `with "${priorityFilter}" priority`}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
