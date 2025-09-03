import Rating from "@mui/material/Rating";
import { format, parseISO, isValid } from "date-fns";
import axios from "axios";
const Feedback = ({ image, name, rating, text, time, id, onDelete }) => {
  let formattedDate = "Date unavailable";

  if (time) {
    const parsedDate = parseISO(time);
    if (isValid(parsedDate)) {
      formattedDate = format(parsedDate, "dd-MM-yyyy");
    }
  }

  return (
    <div className="card shadow-sm h-100">
      <div className="d-flex gap-3 p-3">
        <div className="image">{image}</div>
        <div className="body d-flex flex-column flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <p className="fw-semibold mb-1">{name}</p>
              <Rating
                name="read-only"
                value={rating}
                readOnly
                className="small"
              />
            </div>
            <small className="text-muted">{formattedDate}</small>
          </div>
          <p className="mb-3 flex-grow-1">{text}</p>
          <button
            className="btn btn-danger align-self-end btn-sm"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
