import { FaUsers } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import Growth from "./Growth";
import RecentActivity from "./RecentActivity";

const DashboardPage = () => {
  return (
    // ---------------------Total users + Signups---------------------
    <>
      <div className="d-flex justify-content-around">
        <div className="d-flex bg-white p-3 rounded shadow mb-4 flex-grow-1 m-5">
          <div className="">
            {" "}
            <FaUsers size={24} className="text-primary" />
          </div>
          <div className="ms-2">
            <p>Total Users</p>
            <p>150+</p>
          </div>
        </div>
        <div className="d-flex bg-white p-3 rounded shadow mb-4 flex-grow-1 m-5">
          <div className="">
            <FaCalendarCheck size={24} className="text-success" />
          </div>
          <div className="ms-2">
            <p>Signups this Week</p>
            <p>30+</p>
          </div>
        </div>
        <div className="d-flex bg-white p-3 rounded shadow mb-4 flex-grow-1 m-5">
          <div className="">
            <FaUserPlus size={24} className="text-warning" />
          </div>
          <div className="ms-2">
            <p>Signups Today</p>
            <p>10+</p>
          </div>
        </div>
      </div>

      <div className="">
        <Growth />
      </div>
      <div className="">
        <h3 className="mx-5">Recent Activity</h3>
        <RecentActivity />
      </div>
    </>
  );
};

export default DashboardPage;
