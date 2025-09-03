import { Routes, Route } from "react-router-dom";
import Viewpaper from "./Pages/upload/Viewpaper";
import Viewnotes from "./Pages/Notes/ViewNotes";
import { useNavigate } from "react-router-dom";
import PageNotFound from "../PageNotFound";
const ViewContent = () => {
  const Navigate = useNavigate();

  return (
    <div className="container">
      <div className="btn-group">
        <button
          className="btn btn-danger"
          onClick={() => Navigate("/admin/view-content/papers")}
        >
          {" "}
          view Papers
        </button>
        <button
          className="btn btn-success"
          onClick={() => Navigate("/admin/view-content/notes")}
        >
          view Content
        </button>
      </div>
      <Routes>
        <Route path="/papers" element={<Viewpaper />} />
        <Route path="/notes" element={<Viewnotes />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default ViewContent;
