import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "Week 1", users: 50 },
  { name: "Week 2", users: 100 },
  { name: "Week 3", users: 140 },
  { name: "Week 4", users: 130 },
  { name: "Week 5", users: 160 },
  { name: "Week 6", users: 180 },
  { name: "Week 7", users: 200 },
  { name: "Week 8", users: 230 },
];
const Growth = () => {
  return (
    <div className=" bg-white rounded shadow ">
      <h3 className="p-1 text-center">User Growth</h3>
      <div style={{ width: "98%", height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={3}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Growth;
