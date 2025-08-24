import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
const RecentActivity = () => {
  const [activites, setActivites] = useState([]);
  useEffect(() => {
    const fetchActivites = async () => {
      const response = await axios.get("http://localhost:3000/user/activities");
      const { success, Activites } = response.data;
      if (success) {
        console.log(Activites);
        setActivites(Activites.reverse());
      }
    };
    fetchActivites();
  }, []);
  return (
    <div
      className="rounded shadow bg-white overflow-y-auto table-responsive"
      style={{ height: "300px" }}
    >
      <table className="table table-hover caption-top">
        <caption>
          <strong>
            <h4 className="p-1">Recent Activites</h4>
          </strong>
        </caption>
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th> <th scope="col">Email</th>{" "}
            <th scope="col">Action</th> <th scope="col">Time</th>{" "}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {activites.map((activity) => (
            <tr key={activity.id}>
              <th
                scope="row"
                className="text-truncate"
                style={{ maxWidth: "80px" }}
              >
                {activity.username}
              </th>
              <td className="text-truncate" style={{ maxWidth: "90px" }}>
                {activity.email}
              </td>
              <td className="text-truncate" style={{ maxWidth: "60px" }}>
                {activity.action}
              </td>
              <td className="text-truncate" style={{ maxWidth: "70px" }}>
                {/*data-fns for better strutured dtime */}
                {formatDistanceToNow(
                  new Date(activity.createdAt),
                  // { includeSeconds: true },
                  { addSuffix: true }
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RecentActivity;
