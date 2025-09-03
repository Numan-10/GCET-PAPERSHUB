import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const Viewpaper = () => {
  const [page, setPage] = useState(1);
  const [paper, setPapers] = useState({
    Papers: [],
    totalPages: 1,
  });

  const fetchPapers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/subjects?page=${page}`
      );
      console.log(response.data);
      setPapers((prevData) => ({
        ...prevData,
        Papers: response.data.Papers,
        // page: response.data.page,
        totalPages: response.data.totalPages,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [page]);

  //   URL
  const MyLink = ({ url, children }) => {
    return (
      <a href={url} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="container table-responsive mt-3 ">
      <table className="table table-hover align-middle ">
        <thead className="table-dark">
          <tr>
            <th>Subject</th>
            <th>View</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paper.Papers.map((paper, index) => {
            return (
              <tr key={paper.id}>
                <td>{paper?.Subject}</td>
                <td>
                  {" "}
                  {/* <button className="btn btn-success btn-sm"> */}
                  <MyLink url={paper?.Pdf?.Url}>
                    <FaEye color="aqua" size={18} />
                  </MyLink>
                  {/* </button> */}
                </td>

                <td>
                  {/* <div className="d-flex gap-2"> */}
                  {/* <button
                      className="btn btn-sm btn-primary"
                      disabled={!isChanged || loading}
                      onClick={() => handleRoleSubmit(paper.id)}
                    >
                      <FaEye />
                    </button> */}
                  <button
                    className="btn btn-danger btn-sm"
                    // disabled={loading}
                    onClick={() => handleDelete(paper.id)}
                  >
                    {<MdDeleteForever color="white" size={18} />}
                  </button>
                  {/* </div> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* pagination */}
      <div className="pagination">
        {paper.totalPages > 1 && (
          <Stack spacing={2}>
            <Pagination
              count={paper.totalPages}
              page={page}
              onChange={handleChange}
              color="primary"
              size="large"
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Viewpaper;
