import { FaUsers } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import StatCard from "./StatCard"
const Details = () => {
  return (
    <div className="row">
      <StatCard
        icon={<FaUsers />}
        color="primary"
        title="Total Users"
        value="150+"
      />
      <StatCard
        icon={<FaCalendarCheck />}
        color="success"
        title="Signups this Week"
        value="30+"
      />
      <StatCard
        icon={<FaUserPlus />}
        color="warning"
        title="Signups Today"
        value="10+"
      />
    </div>
  );
};

export default Details;
