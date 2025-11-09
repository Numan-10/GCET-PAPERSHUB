import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaFilePdf, FaUpload } from "react-icons/fa";
import { HiOutlineCog } from "react-icons/hi";
import { MdOutlineSearchOff } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../../../../ApiUrl";

const ViewNotes = () => {
  const [Notes, setNotes] = useState({
    Notes: [],
  });
  const [search, setSearch] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUpdateUnitModal, setShowUpdateUnitModal] = useState(false);
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);
  const [showDeleteUnitModal, setShowDeleteUnitModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [deleteUnitData, setDeleteUnitData] = useState(null);
  const [updateData, setUpdateData] = useState({
    subject: "",
    semester: "",
  });
  const [updateUnitData, setUpdateUnitData] = useState({
    unit: "",
    name: "",
    pdfFile: null,
  });
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/content/fetchSubs`
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

  // Open update subject modal
  const handleUpdateNote = (note) => {
    setSelectedNote(note);
    setUpdateData({
      subject: note.subject,
      semester: note.semester,
    });
    setShowUpdateModal(true);
  };

  // Open update unit modal
  const handleUpdateUnit = (unit, noteId) => {
    setSelectedUnit({ ...unit, noteId });
    setUpdateUnitData({
      unit: unit.unit,
      name: unit.name,
      pdfFile: null,
    });
    setShowUpdateUnitModal(true);
  };

  // Open delete note confirmation modal
  const openDeleteNoteModal = (noteId) => {
    setDeleteNoteId(noteId);
    setShowDeleteNoteModal(true);
  };

  // Open delete unit confirmation modal
  const openDeleteUnitModal = (unitId, noteId) => {
    setDeleteUnitData({ unitId, noteId });
    setShowDeleteUnitModal(true);
  };

  // Handle subject form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle unit form input changes
  const handleUnitInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUnitData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle PDF file selection
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF file only");
        e.target.value = "";
        return;
      }
      setUpdateUnitData((prev) => ({
        ...prev,
        pdfFile: file,
      }));
      toast.success(`Selected: ${file.name}`);
    }
  };

  // Submit subject update
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    if (!updateData.subject.trim() || !updateData.semester) {
      toast.error("Please fill all fields");
      return;
    }

    const toastId = toast.loading("Updating subject...");
    setUpdating(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/content/${selectedNote._id}`,
        updateData
      );

      const { message, success } = response.data;

      if (success) {
        toast.success(message, { id: toastId });

        setNotes((prev) => ({
          ...prev,
          Notes: prev.Notes.map((note) =>
            note._id === selectedNote._id ? { ...note, ...updateData } : note
          ),
        }));

        setShowUpdateModal(false);
      } else {
        toast.error(message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to update", {
        id: toastId,
      });
    } finally {
      setUpdating(false);
    }
  };

  // Submit unit update
  const handleSubmitUnitUpdate = async (e) => {
    e.preventDefault();

    if (!updateUnitData.unit.trim() || !updateUnitData.name.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const toastId = toast.loading("Updating unit...");
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append("unit", updateUnitData.unit);
      formData.append("name", updateUnitData.name);

      if (updateUnitData.pdfFile) {
        formData.append("Pdf", updateUnitData.pdfFile);
      }

      const response = await axios.put(
        `${API_BASE_URL}/content/unit/${selectedUnit._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { message, success, data } = response.data;

      if (success) {
        toast.success(message, { id: toastId });

        setNotes((prev) => ({
          ...prev,
          Notes: prev.Notes.map((note) =>
            note._id === selectedUnit.noteId
              ? {
                  ...note,
                  units: note.units.map((unit) =>
                    unit._id === selectedUnit._id ? data : unit
                  ),
                }
              : note
          ),
        }));

        setShowUpdateUnitModal(false);
      } else {
        toast.error(message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to update unit", {
        id: toastId,
      });
    } finally {
      setUpdating(false);
    }
  };

  // Confirm and delete subject
  const confirmDeleteNote = async () => {
    const toastId = toast.loading("Deleting Subject...");
    setDeleting(true);

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/content/${deleteNoteId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const { message, success } = response.data;

      if (success) {
        toast.success(message, { id: toastId });

        setNotes((prev) => ({
          ...prev,
          Notes: prev.Notes.filter((note) => note._id !== deleteNoteId),
        }));

        setShowDeleteNoteModal(false);
      } else {
        toast.error(message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setDeleting(false);
    }
  };

  // Confirm and delete unit
  const confirmDeleteUnit = async () => {
    const toastId = toast.loading("Deleting Unit...");
    setDeleting(true);

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/content/unit/${deleteUnitData.unitId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const { message, success } = response.data;

      if (success) {
        toast.success(message, { id: toastId });

        setNotes((prev) => ({
          ...prev,
          Notes: prev.Notes.map((note) =>
            note._id === deleteUnitData.noteId
              ? {
                  ...note,
                  units: note.units.filter(
                    (unit) => unit._id !== deleteUnitData.unitId
                  ),
                }
              : note
          ),
        }));

        setShowDeleteUnitModal(false);
      } else {
        toast.error(message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setDeleting(false);
    }
  };

  // Close modals
  const closeModal = () => {
    setShowUpdateModal(false);
    setSelectedNote(null);
    setUpdateData({
      subject: "",
      semester: "",
    });
  };

  const closeUnitModal = () => {
    setShowUpdateUnitModal(false);
    setSelectedUnit(null);
    setUpdateUnitData({
      unit: "",
      name: "",
      pdfFile: null,
    });
  };

  const closeDeleteNoteModal = () => {
    setShowDeleteNoteModal(false);
    setDeleteNoteId(null);
  };

  const closeDeleteUnitModal = () => {
    setShowDeleteUnitModal(false);
    setDeleteUnitData(null);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearch = (searchValue) => {
    setSearch(searchValue.trim());
  };

  const FilteredSearch = Notes.Notes.filter((note) =>
    note.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <Toaster position="top-center" />

      {/* Search Subjects */}
      <div className="row text-center d-flex justify-content-center flex-column align-items-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="mb-1">
            <h2 className="text-center fw-bold text-primary mb-2 mt-3 mt-md-0">
              Search Exam Subjects
            </h2>
            <p className="text-center text-muted">Find Subjects by name</p>
          </div>
          <div className="search mb-4 bg-gradient-light text-dark p-3 rounded input-group input-group-md colorbg shadow-sm">
            <span className="input-group-text bg-primary border-0">
              <FaSearch size={20} color="white" />
            </span>
            <input
              type="text"
              placeholder="Search subjects"
              className="form-control"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="row g-4">
        {FilteredSearch.map((note) => (
          <div key={note._id} className="col-lg-4 col-md-12">
            <div
              className="border-0 shadow-sm h-100"
              style={{ borderRadius: "12px" }}
            >
              {/* Card Header */}
              <div
                className="border-0 d-flex justify-content-between align-items-center p-3"
                style={{
                  background:
                    "linear-gradient(135deg,rgb(92, 99, 50),rgb(44, 148, 207))",
                  borderRadius: "12px 12px 0 0",
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
                        onClick={() => handleUpdateNote(note)}
                      >
                        <FaEdit className="me-2" />
                        Update Subject
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => openDeleteNoteModal(note._id)}
                      >
                        <FaTrash className="me-2" />
                        Delete Subject
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-0">
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
                            className="btn text-success btn-sm"
                            onClick={() => handleUpdateUnit(unit, note._id)}
                            title="Edit Unit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm text-danger"
                            onClick={() =>
                              openDeleteUnitModal(unit._id, note._id)
                            }
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
      {FilteredSearch.length === 0 && search && (
        <div className="text-center py-5">
          <MdOutlineSearchOff color="red" size={70} opacity={0.8} />
          <h3 className="text-muted">No matching subjects found</h3>
          <p className="text-muted">Try a different search term</p>
        </div>
      )}

      {Notes.Notes.length === 0 && !search && (
        <div className="text-center py-5">
          <MdOutlineSearchOff color="red" size={70} opacity={0.8} />
          <h3 className="text-muted">No Study Notes Found</h3>
          <p className="text-muted">
            Your notes will appear here once they're added
          </p>
        </div>
      )}

      {/* Update Subject Modal */}
      {showUpdateModal && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: "12px" }}>
              <div className="modal-header border-0 bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <FaEdit className="me-2" />
                  Update Subject
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                  disabled={updating}
                ></button>
              </div>
              <form onSubmit={handleSubmitUpdate}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Subject Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={updateData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter subject name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Semester <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="semester"
                      value={updateData.semester}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Semester</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={closeModal}
                    disabled={updating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaEdit className="me-2" />
                        Update Subject
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Update Unit Modal */}
      {showUpdateUnitModal && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={closeUnitModal}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: "12px" }}>
              <div className="modal-header border-0 bg-success text-white">
                <h5 className="modal-title fw-bold">
                  <FaEdit className="me-2" />
                  Update Unit
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeUnitModal}
                  disabled={updating}
                ></button>
              </div>
              <form onSubmit={handleSubmitUnitUpdate}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Unit Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="unit"
                      value={updateUnitData.unit}
                      onChange={handleUnitInputChange}
                      placeholder="e.g., Unit 1"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Unit Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={updateUnitData.name}
                      onChange={handleUnitInputChange}
                      placeholder="Enter unit name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Update PDF (Optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                    />
                    <div className="form-text">
                      Leave empty to keep the existing PDF. Upload a new PDF to
                      replace it.
                    </div>
                    {updateUnitData.pdfFile && (
                      <div className="mt-2">
                        <span className="badge bg-success">
                          <FaUpload className="me-1" />
                          New PDF selected: {updateUnitData.pdfFile.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={closeUnitModal}
                    disabled={updating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaEdit className="me-2" />
                        Update Unit
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Subject Confirmation Modal */}
      {showDeleteNoteModal && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={closeDeleteNoteModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: "12px" }}>
              <div className="modal-header border-0 bg-danger text-white">
                <h5 className="modal-title fw-bold">
                  <MdWarning className="me-2" size={24} />
                  Confirm Delete Subject
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeDeleteNoteModal}
                  disabled={deleting}
                ></button>
              </div>
              <div className="modal-body p-4">
                <p className="mb-0">
                  Are you sure you want to delete this subject? This will also
                  delete <strong>all associated units and PDFs</strong>.
                </p>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={closeDeleteNoteModal}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDeleteNote}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FaTrash className="me-2" />
                      Yes, Delete Subject
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Unit Confirmation Modal */}
      {showDeleteUnitModal && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={closeDeleteUnitModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content" style={{ borderRadius: "12px" }}>
              <div className="modal-header border-0 bg-danger text-white">
                <h5 className="modal-title fw-bold">
                  <MdWarning className="me-2" size={24} />
                  Confirm Delete Unit
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeDeleteUnitModal}
                  disabled={deleting}
                ></button>
              </div>
              <div className="modal-body p-4">
                <p className="mb-0">
                  Are you sure you want to delete this unit? This will also
                  delete the <strong>associated PDF file</strong>.
                </p>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={closeDeleteUnitModal}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDeleteUnit}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FaTrash className="me-2" />
                      Yes, Delete Unit
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNotes;
