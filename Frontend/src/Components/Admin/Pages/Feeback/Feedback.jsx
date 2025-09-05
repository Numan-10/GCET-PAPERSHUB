import Rating from "@mui/material/Rating";
import { format, parseISO, isValid } from "date-fns";

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
      <div className="card-body p-3 d-flex flex-column">
        <div className="d-flex align-items-start gap-3 mb-3">
          <div className="flex-shrink-0">{image}</div>

          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p
                  className="fw-semibold mb-1 text-truncate"
                  style={{ maxWidth: "150px" }}
                >
                  {name}
                </p>
                <Rating name="read-only" value={rating} readOnly size="small" />
              </div>
              <small className="text-muted text-nowrap ms-2">
                {formattedDate}
              </small>
            </div>
          </div>
        </div>

        <div className="flex-grow-1 mb-3">
          <p
            className="mb-0 text-muted"
            style={{
              lineHeight: "1.5",
              wordBreak: "break-word",
            }}
          >
            {text}
          </p>
        </div>

        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-danger btn-sm"
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
