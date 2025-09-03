import UploadPaper from "./Upload.jsx";
import NotesPage from "../Notes/NotesPage.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import PageNotFound from "../../../PageNotFound.jsx";

function UploadPage() {
  const Navigate = useNavigate();

  return (
    <div className="container mb-2">
      {/* <Upload /> */}
      <div className="btn-group">
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => Navigate("/admin/upload/uploadpapers")}
        >
          Upload Paper
        </button>
        <button
          type="button"
          class="btn btn-warning"
          onClick={() => Navigate("/admin/upload/uploadnotes/create")}
        >
          Upload Notes
        </button>
      </div>

      <Routes>
        <Route path="/uploadpapers" element={<UploadPaper />} />
        <Route path="/uploadNotes/*" element={<NotesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default UploadPage;
