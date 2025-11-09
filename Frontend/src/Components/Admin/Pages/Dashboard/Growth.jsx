import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { FaBug, FaStar } from "react-icons/fa";
import API_BASE_URL from "../../../../ApiUrl";

const Growth = () => {
  const [data, setData] = useState({ totalBugs: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/growth`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid p-3">
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="spinner-border text-primary" />
        </div>
      </div>
    );
  }

  // Create simple chart data
  const chartData = [
    { name: 'Bug Reports', value: data.totalBugs, color: '#ef4444' },
    { name: 'Reviews', value: data.totalReviews, color: '#3b82f6' }
  ];

  return (
    <div className="container-fluid ">
      {/* Stat Cards */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <div className="bg-white rounded shadow p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Bug Reports</small>
                <h3 className="mb-0 fw-bold text-danger">{data.totalBugs}</h3>
              </div>
              <FaBug size={32} className="text-danger" />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="bg-white rounded shadow p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <small className="text-muted">Reviews</small>
                <h3 className="mb-0 fw-bold text-primary">{data.totalReviews}</h3>
              </div>
              <FaStar size={32} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Simple Visual Graph */}
      <div className="bg-white rounded shadow p-3">
        <h5 className="mb-3 fw-bold">Overview</h5>
        
        <div className="row align-items-center">
          {chartData.map((item, index) => (
            <div key={index} className="col-6 text-center">
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={[{ value: 0 }, { value: item.value }]}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={item.color}
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="mb-0 fw-bold" style={{ color: item.color }}>
                {item.name}
              </p>
              <h4 className="mb-0 fw-bold">{item.value}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Growth;
