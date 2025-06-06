import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../../../ApiUrl";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import ShowUnits from "./ShowUnits";
import UploadUnits from "./UploadUnits";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BackendUrl = API_BASE_URL;
function SubDetails() {
  const [subDetails, setSubDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const Navigate = useNavigate();

  const { subject } = useParams();
  useEffect(() => {
    const data = async () => {
      try {
        const { data } = await axios.get(`${BackendUrl}/content/${subject}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const { message, success, subDetails } = data;
        if (!success) {
          toast.error(message, {
            duration: 2000,
          });
        } else {
          return setSubDetails(subDetails);
        }
      } catch (err) {
        Navigate("/login");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    data();
  }, [subDetails]);

  const Images = [
    "/Assets/Frame 77 (1).svg",
    "/Assets/Frame 78.svg",
    "/Assets/Frame 80.svg",
  ];

  //-------------> Showing the + sign to the specific User-> for adding Subjects <-------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (storedUser && storedEmail && token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.clear();
          setUserData(null);
          return;
        }

        setUserData({
          User: storedUser,
          Email: storedEmail,
          id: decodedToken.id || null,
        });
      } catch (error) {
        localStorage.clear();
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  }, []);
  // ------------------------------------->End!<------------------------------------
  return (
    <div className="container mt-4">
      {/* ---------------------------------->Start Upload Units <-------------------------- */}
      {/* Showing btn to specific user to create the Units */}
      {userData?.id === import.meta.env.VITE_APP_ID && (
        <div className="text-center  ">
          <i
            class="fa-solid fa-circle-plus fa-2x"
            onClick={() => setShow(!Show)}
          ></i>
        </div>
      )}

      {Show && (
        <UploadUnits
          onClose={() => {
            setShow(!Show);
          }}
          sub={subject}
        />
      )}

      {/* ---------------------------------->End Upload Units <-------------------------- */}

      {loading && (
        <div className="text-center mt-5">
          <div class="spinner-border " role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row  ">
        {
          // ----------------------------------------------------------------------------
          subDetails?.units?.map((data, index) => (
            <ShowUnits
              key={index}
              id={data._id}
              name={data.name}
              pdf={data.pdf?.Url}
              unit={data.unit}
              img={Images[index % Images.length]}
            />
          ))
        }
      </div>
      <Toaster />
    </div>
  );
}

export default SubDetails;
