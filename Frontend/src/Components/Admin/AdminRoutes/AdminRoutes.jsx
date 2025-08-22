import { Routes, Route, useLocation } from "react-router";
import DashboardLayout from "../Components/DashboardLayout";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import UsersPage from "../Pages/Users/UsersPage";
import SettingsPage from "../Pages/SettingsPage";
import PageNotFound from "../../PageNotFound";

const AdminRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminRoutes;
