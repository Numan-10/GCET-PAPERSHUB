import Rating from "@mui/material/Rating";

function Testimonials({ Text, Name, Value }) {
  return (
    <div className="container logo-card">
      <div
        className="card shadow-lg  p-3   mb-5 mt-5 overflow-hidden border-warning rounded-4  row copy"
        style={{
          width: "20rem",
          border: "0.5px solid black",
        }}
      >
        <p className="card-text ps-3">{Text}</p>

        <Rating name="read-only" className="mt-1" value={Value} readOnly />
        <h6 class="card-subtitle mb-2 text-body-secondary mt-1 p-1 ps-3">
          {Name}
        </h6>
      </div>
    </div>
  );
}

export default Testimonials;
