import { useNavigate } from "react-router-dom";
const Cards = ({ icon, text, bgColor, route }) => {
  const navigate = useNavigate();
  const Click = () => {
    const External = route.startsWith("https");
    if (External) {
      window.open(route, "_blank");
    } else {
      navigate(`${route}`);
    }
  };
  return (
    <div
      className={`text-center  p-2 rounded-2`}
      style={{ background: `${bgColor}`, minWidth: "150px" }}
      onClick={(e) => Click(e)}
    >
      {icon}
      <div className="fw-medium p-1 text-white">{text}</div>
    </div>
  );
};

export default Cards;
