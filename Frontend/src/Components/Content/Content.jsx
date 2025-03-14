import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl";
import Show from "./Show";

function Content() {
  const Navigate = useNavigate();
  const BackendUrl = API_BASE_URL;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState("");
  useEffect(() => {
    const ContentData = async (req, res) => {
      try {
        const { data } = await axios.get(`${BackendUrl}/content`);
        setData(data);
        console.log(data);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    ContentData();
  }, []);

  const Images = [
    "/Assets/Frame 77 (1).svg",
    "/Assets/Frame 78.svg",
    "/Assets/Frame 80.svg",
  ];

  return (
    <>
      <div className="container">
        <div className="Notes text-center fs-4 fw-bold mt-4 text-decoration-underline mb-3 ">
          Notes Section
        </div>

        {/* Display Error messages */}
        {Error && <p className="text-danger text-center">{Error}</p>}
        {/* Display spinner unitil data comes */}
        {loading && (
          <p className="text-center mt-5">
            {" "}
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </p>
        )}

        {/* MAin Data  */}
        <div className="row">
          {data.map((data, index) => (
            // console.log(data,index)
            <Show
              key={index}
              id={data._id}
              sub={data.subject}
              img={Images[index % Images.length]}
            />
          ))}
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default Content;
