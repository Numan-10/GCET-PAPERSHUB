import React, { useEffect, useState } from "react";
import "./Create.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../ApiUrl";
//
function CreateSub({ onClose }) {
  const [form, setform] = useState({
    subject: "",
    semester: "",
  });
  const [success, setSuccess] = useState(false);
  const handleInputChange = (evt) => {
    // console.log(evt);
    const Field = evt.target.name;
    const Value = evt.target.value;
    // console.log(Field);
    // console.log(Value);
    setform((prevData) => {
      return { ...prevData, [Field]: Value };
    });
  };

  //Toast
  const handleSuccess = (msg) => {
    toast.remove();
    toast.success(msg, {
      duration: 2000,
    });
  };
  const handleError = (msg) => {
    toast.remove();
    toast.error(msg, {
      duration: 2000,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // console.log(form.subject);
    // console.log(form.semester);
    try {
      const response = await axios.post(`${API_BASE_URL}/content/new`, {
        form,
      });
      console.log(response.data);
      const { message, success } = response.data;
      if (success) {
        handleSuccess(message);
        setform({
          subject: "",
          semester: "",
        });
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
      handleError(err?.response?.data?.message || err?.message);
    }
  };

  //   useEffect(() => {
  //     const sendData = async () => {
  //       try {
  //         const response = await axios.post(`${API_BASE_URL}/content/new`, {
  //           form,
  //         });
  //         console.log(response.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     sendData();
  //   }, [form]);
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        onClose();
      }, 50);
      setSuccess(false);
    }
  }, [success]);

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
            placeholder="Subject  Name"
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
          <button type="Submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default CreateSub;
