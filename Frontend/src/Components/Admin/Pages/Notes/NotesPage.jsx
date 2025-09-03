import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UploadNotes from "./UploadNotes";
import CreateNotes from "./CreateNotes";
const NotesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 d-flex justify-content-center align-items-center flex-column">
      <div className="btn-group">
        <button
          className="btn btn-left btn-primary"
          onClick={() => navigate("/admin/upload/uploadnotes/create")}
        >
          Create Subject
        </button>
        <button
          className="btn btn-right btn-success"
          onClick={() => navigate("/admin/upload/uploadnotes/upload")}
        >
          Upload into Existing
        </button>
      </div>
      <Routes>
        <Route path="/create" element={<CreateNotes />} />
        <Route
          path="/upload"
          element={<UploadNotes />}
        />
      </Routes>
    </div>
  );
};

export default NotesPage;
