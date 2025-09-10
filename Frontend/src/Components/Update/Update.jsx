import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

function Update({ msg, link }) {
  return (
    <div className="row m-2">
      <div 
        className="col-12 mt-3 p-3 rounded" 
        style={{ color: "white", backgroundColor: "black" }}
      >
        <p className="mb-0" style={{ whiteSpace: "pre-line" }}>
          {msg}
        </p>
        
        {link && (
          <div className="mt-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warning text-decoration-none d-inline-flex align-items-center gap-1"
            >
              <FaExternalLinkAlt size={12} />
              <span className="small">→ Visit Link</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Update;
