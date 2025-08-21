import { useState } from "react";
import Sidebar from "../Pages/Sidebar";
import Navbar from "../Pages/Navbar";
import "../admin.css";
const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar isOpen={open} toggleSidebar={() => setOpen(!open)} />
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar toggleSidebar={() => setOpen(!open)} />
        <main className="flex-grow-1 p-3 bg-light overflow-y-auto main-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
