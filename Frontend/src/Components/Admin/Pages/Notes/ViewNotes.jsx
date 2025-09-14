import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import { HiOutlineCog } from "react-icons/hi";
import { MdOutlineSearchOff } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
const ViewNotes = () => {
  const [Notes, setNotes] = useState({
    Notes: [],
  });
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/content/fetchSubs"
      );
      console.log(response.data);

      setNotes({
        Notes: response.data.subjects,
        totalPages: response.data.totalPages,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateNote = (noteId) => {
    console.log("Update note:", noteId);
  };

  // Deleting ntoes
  const handleDeleteNote = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this subject?"
    );
    if (!confirm) return;

    const toastId = toast.loading("Deleting Subject...");
    try {
      const response = await axios.delete(
        `http://localhost:3000/content/${id}`
      );
      const { message, success } = response.data;

      if (success) {
        toast.success(message, { id: toastId });

        // 🔥 Remove the deleted note from state
        setNotes((prev) => ({
          ...prev,
          Notes: prev.Notes.filter((note) => note._id !== id),
        }));
      } else {
        toast.error(message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something Went Wrong!", { id: toastId });
    }
  };

  const handleUpdateUnit = (unitId, noteId) => {
    console.log("Update unit:", unitId, "in note:", noteId);
  };

  const handleDeleteUnit = async (unitId, noteId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this unit?"
    );
    if (!confirm) return;

    const toastId = toast.loading("Deleting Unit...");
    try {
      const response = await axios.delete(
        `http://localhost:3000/content/unit/${unitId}`
      );
      const { message, success } = response.data;

      if (success) {
        toast.success(message, { id: toastId });

        // ✅ Remove the unit from the correct note
        setNotes((prev) => ({
          ...prev,
          Notes: prev.Notes.map((note) =>
            note._id === noteId
              ? {
                  ...note,
                  units: note.units.filter((unit) => unit._id !== unitId),
                }
              : note
          ),
        }));
      } else {
        toast.error(message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something Went Wrong!", { id: toastId });
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle search
  const handleSearch = (searchValue) => {
    setSearch(searchValue.trim());
    // window.scrollTo(0, 400);
  };

  // Filterred results based on search
  const FilteredSearch = Notes.Notes.filter((note) =>
    note.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid ">
      {/* --------------------> Search subjecsts<---------------- */}
      <div className="row text-center d-flex justify-content-center flex-column align-items-center">
        <div className="col-12  col-md-10 col-lg-8">
          <div className="mb-1">
            <h2 className="text-center fw-bold text-primary mb-2 mt-3 mt-md-0 ">
              Search Exam Subjects
            </h2>
            <p className="text-center text-muted">Find Subjects by name</p>
          </div>
          <div className="search mb-4 bg-gradient-light text-dark  p-3 rounded input-group  input-group-md colorbg shadow-sm">
            <span className="input-group-text bg-primary border-0">
              <FaSearch size={20} color="white" />
            </span>
            <input
              type="text"
              placeholder="Search papers"
              className="form-control"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* -------------------------------> cards Grid<---------------------------------- */}
      <div className="row g-4">
        {FilteredSearch.map((note) => (
          <div key={note._id} className="col-lg-4 col-md-12">
            <div
              className=" border-0 shadow-sm h-100"
              style={{ borderRadius: "12px" }}
            >
              {/* Card Header */}
              <div
                className=" border-0 d-flex justify-content-between align-items-center p-3"
                style={{
                  background:
                    "linear-gradient(135deg,rgb(92, 99, 50),rgb(44, 148, 207))",
                  borderRadius: "12px 12px 0 0",
                  // padding: "20px",
                }}
              >
                <div>
                  <h4 className="text-white mb-1 fw-bold">{note.subject}</h4>
                  <span className="text-white opacity-75">
                    <FaBook color="white" /> Semester {note.semester}
                  </span>
                </div>

                {/* Settings Button */}
                <div className="dropdown">
                  <button
                    className="btn btn-light btn-sm rounded-circle"
                    data-bs-toggle="dropdown"
                  >
                    <HiOutlineCog />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleUpdateNote(note._id)}
                      >
                        Update Subject
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        Delete Subject
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ---------------------------------->Card Body<----------------------------- */}
              <div className=" p-0">
                {note.units.length > 0 ? (
                  note.units.map((unit) => (
                    <div key={unit._id} className="border-bottom p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          {/* Unit Badge */}
                          <span
                            className="badge bg-primary rounded-pill me-3"
                            style={{ minWidth: "45px", fontSize: "0.8rem" }}
                          >
                            {unit.unit}
                          </span>
                          <div>
                            <h6 className="mb-1" style={{ color: "#333" }}>
                              {unit.name}
                            </h6>
                            {unit.pdf?.Url && (
                              <a
                                href={unit.pdf.Url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-sm"
                              >
                                <FaFilePdf className="me-1" />
                                View PDF
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Unit Action Buttons */}
                        <div>
                          <button
                            className="btn text-success btn-sm "
                            onClick={() => handleUpdateUnit(unit._id, note._id)}
                            title="Edit Unit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm text-danger"
                            onClick={() => handleDeleteUnit(unit._id, note._id)}
                            title="Delete Unit"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <div
                      className="mb-3"
                      style={{ fontSize: "4rem", opacity: "0.3" }}
                    >
                      <FaPencilAlt />
                    </div>
                    <p className="text-muted mb-0">No units available yet</p>
                    <small className="text-muted">
                      Units will appear here once added
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {Notes.Notes.length === 0 && (
        <div className="text-center py-5">
          <MdOutlineSearchOff color="red" size={70} opacity={0.8} />

          <h3 className="text-muted">No Study Notes Found</h3>
          <p className="text-muted">
            Your notes will appear here once they're added
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewNotes;
