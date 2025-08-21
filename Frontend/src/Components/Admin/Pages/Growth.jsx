import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    <div className="p-4 bg-white rounded shadow m-5">
      <h3 className="mb-2">User Growth</h3>
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Growth;
