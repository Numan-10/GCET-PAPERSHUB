import React from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeftCircle,
  FiBookOpen,
} from "react-icons/fi";

function Guidelines() {
  return (
    <div
      className="container py-5"
      style={{ maxWidth: "800px", lineHeight: 1.7 }}
    >
      {/* Header Section */}
      <div className="d-flex align-items-center mb-4">
        <FiBookOpen
          style={{ fontSize: 32, color: "#2563eb", marginRight: 10 }}
        />
        <h2 className="fw-bold mb-0" style={{ color: "#1e293b" }}>
          Submission Guidelines
        </h2>
      </div>

      <p style={{ color: "#475569", marginBottom: "1.5rem" }}>
        Please follow these simple guidelines before uploading your notes or
        papers to help ensure smooth review and acceptance.
      </p>

      {/* Guidelines List */}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li className="mb-3 d-flex align-items-start">
          <FiCheckCircle
            style={{
              fontSize: 20,
              color: "#22c55e",
              marginRight: 10,
              marginTop: 2,
            }}
          />
          <span style={{ color: "#334155" }}>
            Only <strong>PDF files</strong> are accepted.
          </span>
        </li>

        <li className="mb-3 d-flex align-items-start">
          <FiCheckCircle
            style={{
              fontSize: 20,
              color: "#22c55e",
              marginRight: 10,
              marginTop: 2,
            }}
          />
          <span style={{ color: "#334155" }}>
            Use <strong>clear headings</strong> and maintain proper structure in
            your notes.
          </span>
        </li>

        <li className="mb-3 d-flex align-items-start">
          <FiAlertCircle
            style={{
              fontSize: 20,
              color: "#ef4444",
              marginRight: 10,
              marginTop: 2,
            }}
          />
          <span style={{ color: "#334155" }}>
            Avoid <strong>blurred scans</strong> or unclear handwriting.
          </span>
        </li>

        <li className="mb-3 d-flex align-items-start">
          <FiAlertCircle
            style={{
              fontSize: 20,
              color: "#ef4444",
              marginRight: 10,
              marginTop: 2,
            }}
          />
          <span style={{ color: "#334155" }}>
            Poor quality or incomplete files will be{" "}
            <strong style={{ color: "#dc2626" }}>rejected</strong>.
          </span>
        </li>

        <li className="mb-3 d-flex align-items-start">
          <FiCheckCircle
            style={{
              fontSize: 20,
              color: "#22c55e",
              marginRight: 10,
              marginTop: 2,
            }}
          />
          <span style={{ color: "#334155" }}>
            Double-check your file before submitting.
          </span>
        </li>

        <li className="mb-3 d-flex align-items-start">
          <FiCheckCircle
            style={{
              fontSize: 20,
              color: "#22c55e",
              marginRight: 10,
              marginTop: 2,
            }}
          />
          <span style={{ color: "#334155" }}>
            Follow the proper naming convention: <br />
            <code
              style={{
                background: "#f1f5f9",
                padding: "4px 8px",
                borderRadius: 6,
              }}
            >
              subject_unitNo_designation.pdf
            </code>
            <br />
            Example: <strong>DC_Unit_III_N_10.pdf</strong>
          </span>
        </li>

        <li className="mb-3 d-flex align-items-start">
          <FiCheckCircle
            style={{
              fontSize: 20,
              color: "#22c55e",
              marginRight: 10,
              marginTop: 2,
            }}
          />
          <span style={{ color: "#334155" }}>
            Once submitted, your file will be{" "}
            <strong>reviewed by admin/manager's</strong>. If suitable, it will be
            uploaded officially to the main content.
          </span>
        </li>
      </ul>

      {/* Back Button */}
      <div className="mt-4">
        <a
          href="/contribute"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(120deg, #3b82f6, #2563eb)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: 500,
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(120deg, #2563eb, #1d4ed8)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(120deg, #3b82f6, #2563eb)")
          }
        >
          <FiArrowLeftCircle size={18} />
          Go Back to Upload Page
        </a>
      </div>
    </div>
  );
}

export default Guidelines;
