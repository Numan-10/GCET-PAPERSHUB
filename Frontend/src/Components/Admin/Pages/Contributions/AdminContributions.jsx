import React, { useState, useEffect } from "react";
import { FiEye, FiClock } from "react-icons/fi";
import { MdDelete, MdInfo, MdDownload } from "react-icons/md";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { HiDocumentText, HiClipboardList } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../../ApiUrl";

function AdminContributions() {
  // State variables
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [processing, setProcessing] = useState(false);

  // Fetch contributions on mount
  useEffect(() => {
    fetchContributions();
  }, []);

  // Fetch all contributions
  const fetchContributions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contributions`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();

      if (data.success) {
        setContributions(data.data);
      } else {
        toast.error("Failed to load contributions");
      }
    } catch (error) {
      toast.error("Error connecting to server");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Open PDF in new tab
  const openPdfPreview = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast.error("PDF URL not available");
    }
  };

  // // Download PDF
  // const downloadPdf = (url, filename) => {
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = filename || "download.pdf";
  //   link.target = "_blank";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  // Open confirmation modal
  const openConfirmDialog = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  // Delete contribution
  const deleteContribution = async () => {
    setProcessing(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/contributions/delete/${selectedId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Contribution deleted!");
        fetchContributions();
      } else {
        toast.error(data?.message || "failed to Delete!");
      }
    } catch (error) {
      toast.error("Error deleting");
      console.error(error);
    } finally {
      setProcessing(false);
      setShowConfirm(false);
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="container-fluid p-3 p-md-4"
      style={{ background: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1 fs-3 fs-md-2" style={{ color: "#1e293b" }}>
          User Contributions
        </h2>
        <p className="text-muted mb-0 small">
          <MdInfo size={18} className="me-2" />
          Review, download, and manage user-submitted notes and papers
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading contributions...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && contributions.length === 0 && (
        <div className="text-center py-5">
          <BsFileEarmarkPdf size={64} className="text-muted mb-3" />
          <h5 className="text-muted">No contributions yet</h5>
          <p className="text-muted small">
            Waiting for users to submit notes and papers
          </p>
        </div>
      )}

      {/* Contributions Grid */}
      {!loading && contributions.length > 0 && (
        <div className="row g-3 g-md-4">
          {contributions.map((item) => (
            <div key={item._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div
                className="card shadow-sm h-100"
                style={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0,0,0,0.12)";
                }}
              >
                <div className="card-body p-3">
                  {/* Tag Badge */}
                  <div className="mb-3 d-flex align-items-center gap-2">
                    <span
                      className={`badge ${
                        item.tag === "notes" ? "bg-primary" : "bg-secondary"
                      }`}
                      style={{
                        fontSize: "0.8rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.tag === "notes" ? (
                        <>
                          <HiClipboardList className="me-1" size={14} />
                          Notes
                        </>
                      ) : (
                        <>
                          <HiDocumentText className="me-1" size={14} />
                          Paper
                        </>
                      )}
                    </span>
                  </div>

                  {/* PDF Icon */}
                  <div className="text-center mb-3">
                    <BsFileEarmarkPdf size={48} style={{ color: "#dc3545" }} />
                  </div>

                  {/* Info */}
                  <div className="mb-3">
                    <p className="small text-muted mb-1">
                      <FiClock size={14} className="me-1" />
                      {formatDate(item.uploadedAt)}
                    </p>
                    <p className="small text-muted mb-0">
                      By: <strong>{item.uploadedBy || "Anonymous"}</strong>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex flex-column gap-2">
                    {/* Preview Button */}
                    <button
                      className="btn btn-sm btn-outline-info w-100"
                      onClick={() => openPdfPreview(item.Pdf?.Url)}
                      title="Open PDF in new tab"
                    >
                      <FiEye size={16} className="me-1" />
                      Preview
                    </button>

                    {/* Delete Button */}
                    <button
                      className="btn btn-sm btn-danger w-100"
                      onClick={() => openConfirmDialog(item._id)}
                      title="Delete contribution"
                    >
                      <MdDelete size={16} className="me-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => !processing && setShowConfirm(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: "12px" }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Delete Contribution</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                  disabled={processing}
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Are you sure you want to delete this contribution? This action
                  cannot be undone and will remove the file from both the
                  database and Cloudinary.
                </p>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirm(false)}
                  disabled={processing}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={deleteContribution}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <MdDelete className="me-1" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContributions;
