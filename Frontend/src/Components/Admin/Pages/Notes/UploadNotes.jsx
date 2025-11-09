import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../../ApiUrl";

function UploadNotes() {
  const BackendUrl = API_BASE_URL;

  const [form, setform] = useState({
    name: "",
    sub: "",
    unit: "",
    pdf: null,
  });
  const [sub, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/content/fetchSubs`);
      const { subjects, success, err } = response.data;
      // console.log(response.data);
      if (success) {
        setSubs(subjects);
      } else {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSubs();
  }, []);

  const handleOnChange = (evt) => {
    const Field = evt.target.name;
    // console.log(evt.target);

    if (Field === "pdf") {
      setform((prevData) => {
        return { ...prevData, [Field]: evt.target.files[0] };
      });
    } else {
      // console.log(evt.target.value);

      setform((prevData) => {
        return { ...prevData, [Field]: evt.target.value };
      });
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (form?.pdf?.type !== "application/pdf") {
      setLoading(false);
      toast.remove();
      return toast.error("Please upload a valid PDF file!");
    }

    const formData = new FormData();
    formData.append("Unit[name]", form.name);
    formData.append("Unit[unit]", form.unit);
    formData.append("Pdf", form.pdf);

    try {
      const response = await axios.post(
        `${BackendUrl}/content/${form.sub}/new`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

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
      sub: "",
      pdf: null,
    });
  };

  return (
    <div className="m-3 p-3 rounded-2 text-center">
      <div className="row">
        <div className="col-12 ">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Unit name or chapter name"
              value={form.name}
              onChange={handleOnChange}
              name="name"
            />
            <select
              className="form-select mb-3"
              onChange={(e) => handleOnChange(e)}
              name="sub"
              defaultValue={"Select Subject"}
            >
              {sub?.map((subject, index) => (
                <option
                  key={subject._id}
                  value={subject.subject}
                  className="text-center"
                >
                  {subject.subject}
                </option>
              ))}
            </select>
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
      </div>

      <Toaster />
    </div>
  );
}

export default UploadNotes;
