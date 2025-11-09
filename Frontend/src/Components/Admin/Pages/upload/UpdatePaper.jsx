import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import API_BASE_URL from "../../../../ApiUrl";
const UpdatePaper = ({ paper, onClose }) => {
  const [Data, setData] = useState({
    Subject: paper?.Subject || "",
    Semester: paper?.Semester || "",
    Title: paper?.Title || "",
    Pdf: null,
  });

  const handleonChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnFileChange = (e) => {
    if (e.target.files && e.target.files[0].type === "application/pdf") {
      setData((prev) => ({
        ...prev,
        Pdf: e.target.files[0],
      }));
    } else {
      setData((prev) => ({ ...prev, Pdf: null }));
      toast.error("Enter a valid PDF file");
    }
  };

  const handleonSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("id", paper._id);
    form.append("Subject", Data.Subject);
    form.append("Semester", Data.Semester);
    form.append("Title", Data.Title);
    if (Data.Pdf) {
      form.append("Pdf", Data.Pdf);
      form.append("filename", paper?.Pdf?.filename);
    }

    // show loading toast
    const toastId = toast.loading("Updating paper...");

    try {
      const response = await axios.put(
        `${API_BASE_URL}/subjects/update`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const { message, success } = response.data;
      toast.dismiss(toastId);
      toast[success ? "success" : "error"](message);
      if (success) onClose();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <form
      className="col-12 col-md-8 col-lg-6 mt-5 d-flex flex-column mb-5 p-5 rounded-5"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
      onSubmit={handleonSubmit}
    >
      <div className="row">
        <div className="col">
          <label htmlFor="subject" className="fw-medium">
            Subject <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="Subject"
            value={Data.Subject}
            onChange={handleonChange}
          />
        </div>
        <div className="col">
          <label htmlFor="semester" className="fw-medium">
            Semester <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="semester"
            name="Semester"
            value={Data.Semester}
            onChange={handleonChange}
          />
        </div>
      </div>

      <div className="mt-2">
        <label htmlFor="title" className="fw-medium">
          Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="Title"
          value={Data.Title}
          onChange={handleonChange}
        />
      </div>

      <div className="mt-2">
        <label htmlFor="file" className="fw-medium">
          Upload PDF (optional)
        </label>
        <input
          type="file"
          className="form-control"
          id="file"
          name="Pdf"
          onChange={handleOnFileChange}
        />
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
        <button type="button" className="btn btn-dark" onClick={onClose}>
          Cancel
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default UpdatePaper;
