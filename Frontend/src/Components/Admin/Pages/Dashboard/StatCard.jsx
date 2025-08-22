import React from "react";
const StatCard = ({ icon, color, title, value }) => {
  const iconClass = `text-${color}`;

  return (
    <>
      <div className="col-12 col-lg-4 mb-3 ">
        <div className="card shadow-sm border-0 ">
          <div className="p-4 d-flex justify-content-between align-items-center">
            <div>
              <h3 className="fw-bolder mb-1">{value}</h3>
              <p className="text-muted mb-0">{title}</p>
            </div>

            <div className={`p-3 rounded-circle bg-${color} bg-opacity-10`}>
              {React.cloneElement(icon, { size: 24, className: iconClass })}
              {/* clones the exisating element do some changes and return it */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StatCard;
