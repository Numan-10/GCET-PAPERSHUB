import React, { useState } from "react";
import "./ShowUnits.css";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../ApiUrl";
import axios from "axios";

function UploadUnits({ onClose, sub }) {
  const BackendUrl = API_BASE_URL;

  const [form, setform] = useState({
    name: "",
    unit: "",
    pdf: null,
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (evt) => {
    console.log(evt);
    const Field = evt.target.name;
    // console.log(Field);
    // console.log(value);

    if (Field === "pdf") {
      setform((prevData) => {
        return { ...prevData, [Field]: evt.target.files[0] };
      });
    } else {
      setform((prevData) => {
        return { ...prevData, [Field]: evt.target.value };
      });
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(sub);

    if (form?.pdf?.type !== "application/pdf") {
      setLoading(false);
      toast.remove();
      return toast.error("Please upload a valid PDF file!");
    }
    console.log(form);

    const formData = new FormData();
    formData.append("Unit[name]", form.name);
    formData.append("Unit[unit]", form.unit);
    formData.append("Pdf", form.pdf);

    try {
      // console.log(form.name, form.unit);
      const response = await axios.post(
        `${BackendUrl}/content/${sub}/new`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      const { message, success } = response.data;

      if (success) {
        toast.remove();
        setLoading(false);
        toast.success(message, {
          duration: 2000,
        });
      } else {
        toast.remove();
        setLoading(false);
        toast.error(message, {
          duration: 2000,
        });
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.remove();
      toast.error(err?.response?.data?.message || "Somthing Went Wrong", {
        duration: 2000,
      });
    }

    setform({
      name: "",
      unit: "",
      pdf: null,
    });
  };

  return (
    <div className="above">
      <div className="form-container m-3 p-3 rounded-2 text-center">
        <button className="closebtn" onClick={onClose}>
          ✖
        </button>
        <h2>Add Unit</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Unit name or chapter name"
            value={form.name}
            onChange={handleOnChange}
            name="name"
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Unit number e.g: Unit I, Unit II"
            value={form.unit}
            onChange={handleOnChange}
            name="unit"
          />
          <input
            type="file"
            className="form-control mb-3"
            name="pdf"
            onChange={handleOnChange}
          />

          {loading ? (
            <button className="btn btn-success" type="button" disabled>
              Uploading... &nbsp;
              <span className="spinner-border spinner-border-sm"></span>
            </button>
          ) : (
            <button type="Submit" className="btn btn-danger ">
              Submit
            </button>
          )}
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default UploadUnits;
