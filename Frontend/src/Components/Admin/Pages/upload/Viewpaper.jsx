import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import toast, { Toaster } from "react-hot-toast";
import { MdPublishedWithChanges } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineSearchOff } from "react-icons/md";
import UpdatePaper from "./UpdatePaper";

const Viewpaper = () => {
  const [page, setPage] = useState(1);
  const [paper, setPapers] = useState({
    Papers: [],
    totalPages: 1,
  });

  // Update
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const handleOnUpdate = (paper) => {
    setShow(!show);
    setFile(paper);
  };

  // Fetch all papers
  const fetchPapers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/subjects?page=${page}`
      );
      setPapers({
        Papers: response.data.Papers,
        totalPages: response.data.totalPages,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch papers");
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [page]);

  // Simple wrapper for external links
  const MyLink = ({ url, children }) => (
    <a href={url} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Delete paper
  const handleDelete = async (id, filename) => {
    const toastId = toast.loading("Deleting paper...");
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/subjects?id=${id}&filename=${filename}`
      );

      if (data.success) {
        toast.success(data.message, { id: toastId });

        // Update UI immediately without waiting for refetch
        setPapers((prev) => ({
          ...prev,
          Papers: prev.Papers.filter((p) => p._id !== id),
        }));
      } else {
        toast.error(data.message || "Failed to delete", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message, { id: toastId });
    }
  };

  return (
    <div className="container table-responsive mt-3">
      {show && (
        <div className="vh-100 d-flex flex-column justify-content-start align-items-center">
          <UpdatePaper onClose={() => setShow(!show)} paper={file} />{" "}
        </div>
      )}

      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Subject</th>
            <th>View</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paper.Papers.map((paper) => (
            <tr key={paper._id}>
              <td>{paper.Subject}</td>
              <td>
                <MyLink url={paper?.Pdf?.Url}>
                  <FaEye color="aqua" size={18} />
                </MyLink>
              </td>
              <td className="d-flex gap-3 text-center">
                <div className="">
                  <Tooltip title="Update">
                    <button className="btn btn-success btn-sm">
                      <MdPublishedWithChanges
                        color="white"
                        size={18}
                        onClick={() => handleOnUpdate(paper)}
                      />
                    </button>
                  </Tooltip>
                </div>

                <div className="">
                  <Tooltip title="Delete">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(paper._id, paper?.Pdf?.filename)
                      }
                    >
                      <MdDeleteForever color="white" size={18} />
                    </button>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {paper.totalPages > 1 && (
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={paper.totalPages}
              page={page}
              onChange={handleChange}
              color="primary"
              size="large"
            />
          </Stack>
        </div>
      )}

      <Toaster />

      {paper.Papers.length === 0 && (
        <div className="text-center py-5">
          <MdOutlineSearchOff color="red" size={70} opacity={0.8} />
          <h3 className="text-muted">No Papers Found</h3>
          <p className="text-muted">
            Your Papers will appear here once they're added
          </p>
        </div>
      )}
    </div>
  );
};

export default Viewpaper;
