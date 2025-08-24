import { FaUsers } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import StatCard from "./StatCard";
import { useState, useEffect } from "react";
import axios from "axios";
const Details = () => {
  const [Details, setDetails] = useState({
    TotalUsers: "",
    last7DaysCount: "",
    todayCount: "",
  });
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3000/user");
      const { TotalUsers, last7DaysCount, todayCount } = response.data;

      setDetails({
        TotalUsers: TotalUsers,
        last7DaysCount: last7DaysCount,
        todayCount: todayCount,
      });
    };
    fetchUsers();
  }, []);

  return (
    <div className="row">
      <StatCard
        icon={<FaUsers />}
        color="primary"
        title="Total Users"
        value={`${Details.TotalUsers}+`}
      />
      <StatCard
        icon={<FaCalendarCheck />}
        color="success"
        title="Signups this Week"
        value={`${Details.last7DaysCount}+`}
      />
      <StatCard
        icon={<FaUserPlus />}
        color="warning"
        title="Signups Today"
        value={`${Details.todayCount}+`}
      />
    </div>
  );
};

export default Details;
