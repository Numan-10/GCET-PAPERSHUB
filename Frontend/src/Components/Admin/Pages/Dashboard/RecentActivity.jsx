const activities = [
  {
    id: 1,
    Email: "john@example.com",
    user: "John Doe",
    action: "signed up",
    time: "2 mins ago",
  },
  {
    id: 2,
    Email: "alice@example.com",
    user: "Alice",
    action: "logged in",
    time: "10 mins ago",
  },
  {
    id: 3,
    Email: "michael@example.com",
    user: "Michael",
    action: "updated profile",
    time: "30 mins ago",
  },
  {
    id: 4,
    Email: "sarah@example.com",
    user: "Sarah",
    action: "signed up",
    time: "1 hour ago",
  },
  {
    id: 5,
    Email: "david@example.com",
    user: "David",
    action: "logged out",
    time: "2 hours ago",
  },
  {
    id: 6,
    Email: "emma@example.com",
    user: "Emma",
    action: "updated settings",
    time: "3 hours ago",
  },
  {
    id: 7,
    Email: "olivia@example.com",
    user: "Olivia",
    action: "logged in",
    time: "5 hours ago",
  },
];
const RecentActivity = () => {
  return (
    <div
      className="rounded shadow bg-white overflow-y-auto table-responsive"
      style={{ height: "300px" }}
    >
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th> <th scope="col">Email</th>{" "}
            <th scope="col">Action</th> <th scope="col">Time</th>{" "}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {activities.map((activity) => (
            <tr key={activity.id}>
              <th scope="row" className="text-truncate" style={{ maxWidth: "100px" }}>{activity.user}</th>
              <td className="text-truncate" style={{ maxWidth: "110px" }}>
                {activity.Email}
              </td>
              <td   className="text-truncate" style={{ maxWidth: "70px" }}>{activity.action}</td>
              <td className="text-truncate" style={{ maxWidth: "50px" }}>{activity.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RecentActivity;
