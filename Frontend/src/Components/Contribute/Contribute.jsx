import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiUploadCloud, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { MdCloudUpload, MdInfo } from "react-icons/md";
import API_BASE_URL from "../../ApiUrl";
function Contribute() {
  const [file, setFile] = useState(null);
  const [tag, setTag] = useState("notes");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      toast.success(`Selected: ${selected.name}`);
    } else {
      setFile(null);
      toast.error("Please select a valid PDF file only.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !semester || !subject) {
      toast.error("Please fill all required fields and upload a PDF.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("Pdf", file);
    formData.append("tag", tag);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("uploadedBy", localStorage.getItem("user"));

    try {
      const res = await fetch(`${API_BASE_URL}/contributeNotes`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Submission successful!");
        setFile(null);
        setSemester("");
        setSubject("");
        document.getElementById("pdf-upload").value = "";
      } else {
        toast.error("Upload failed. Please try again!");
      }
    } catch {
      toast.error("Error uploading. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ minHeight: "100vh", paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <Toaster position="top-center" />
      <div className="container">
        <div className="row g-4 justify-content-center">
          {/* Upload Form Section */}
          <div className="col-lg-6">
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                padding: "2.5rem",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
              }}
            >
              <div className="text-center mb-4">
                <div
                  style={{
                    width: 80,
                    height: 80,
                    margin: "0 auto 1.5rem",
                    background:
                      "linear-gradient(120deg, #3b82f6 0%, #2563eb 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
                  }}
                >
                  <MdCloudUpload style={{ fontSize: 40, color: "#ffffff" }} />
                </div>
                <h2 className="fw-bold mb-2" style={{ color: "#1e293b" }}>
                  Contribute to GCET
                </h2>
                <p style={{ color: "#64748b", fontSize: 15 }}>
                  Upload your notes or papers for  review.&nbsp;
                  <a
                    href="/contribute/guidelines"
                    style={{
                      color: "#2563eb",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    View submission guidelines →
                  </a>
                </p>
              </div>

              <form onSubmit={handleSubmit} autoComplete="off">
                {/* Semester */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold mb-2"
                    style={{ color: "#334155" }}
                  >
                    Semester <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <select
                    className="form-select"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #e2e8f0",
                      padding: "0.75rem 1rem",
                      fontSize: 15,
                      color: "#475569",
                    }}
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold mb-2"
                    style={{ color: "#334155" }}
                  >
                    Subject <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject name"
                    required
                    className="form-control"
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #e2e8f0",
                      padding: "0.75rem 1rem",
                      fontSize: 15,
                      color: "#475569",
                    }}
                  />
                </div>

                {/* File Upload */}
                <div className="mb-4">
                  <label
                    htmlFor="pdf-upload"
                    className="form-label fw-semibold mb-2"
                    style={{ color: "#334155" }}
                  >
                    Select PDF File <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div
                    style={{
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "2rem 1.5rem",
                      textAlign: "center",
                      background: "#f8fafc",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      document.getElementById("pdf-upload").click()
                    }
                  >
                    <FiUploadCloud
                      style={{
                        fontSize: 48,
                        color: "#3b82f6",
                        marginBottom: 12,
                      }}
                    />
                    <p className="mb-2" style={{ color: "#475569" }}>
                      Click to browse and select your PDF file
                    </p>
                    <input
                      id="pdf-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    {file && (
                      <div
                        className="mt-3 p-2"
                        style={{
                          background: "#dcfce7",
                          borderRadius: "8px",
                          color: "#166534",
                          fontSize: 14,
                        }}
                      >
                        <FiCheckCircle style={{ marginRight: 8 }} />
                        {file.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tag Selection */}
                <div className="mb-4">
                  <label
                    className="form-label fw-semibold mb-2"
                    style={{ color: "#334155" }}
                  >
                    Type/Tag
                  </label>
                  <select
                    className="form-select"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #e2e8f0",
                      padding: "0.75rem 1rem",
                      fontSize: 15,
                      color: "#475569",
                    }}
                  >
                    <option value="notes">Notes</option>
                    <option value="paper">Paper</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-100"
                  style={{
                    background: loading
                      ? "#cbd5e0"
                      : "linear-gradient(120deg, #3b82f6 0%, #2563eb 100%)",
                    color: "#ffffff",
                    border: "none",
                    padding: "0.9rem",
                    borderRadius: "10px",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  {loading ? "Uploading..." : "Upload for Review"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contribute;
