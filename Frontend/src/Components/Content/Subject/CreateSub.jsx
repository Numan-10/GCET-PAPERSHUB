import React, { useEffect, useState } from "react";
import "./Create.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../ApiUrl";

function CreateSub({ onClose }) {
  const [form, setForm] = useState({
    subject: "",
    semester: "",
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (evt) => {
    const field = evt.target.name;
    const value = evt.target.value;
    setForm((prevData) => ({ ...prevData, [field]: value }));
  };

  // Toast notifications
  const handleSuccess = (msg) => {
    toast.remove();
    toast.success(msg, { duration: 2000 });
  };

  const handleError = (msg) => {
    toast.remove();
    toast.error(msg, { duration: 2000 });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/content/new`,
        form,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);
      const { message, success } = response.data;
      if (success) {
        handleSuccess(message);
        setForm({ subject: "", semester: "" });
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
      handleError(err?.response?.data?.message || err?.message);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onClose();
      }, 50);
      setSuccess(false);
    }
  }, [success, onClose]);

  return (
    <div className="above p-4">
      <div className="form-container p-4 rounded-4 text-center">
        <button className="closebtn" onClick={onClose}>
          ✖
        </button>
        <h2>Add Subject</h2>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Subject Name"
            value={form.subject}
            onChange={handleInputChange}
            name="subject"
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Semester"
            value={form.semester}
            onChange={handleInputChange}
            name="semester"
          />
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default CreateSub;
