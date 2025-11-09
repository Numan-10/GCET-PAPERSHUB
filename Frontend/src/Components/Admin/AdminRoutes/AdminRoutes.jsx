import { Routes, Route } from "react-router";
import DashboardLayout from "../Components/DashboardLayout";
import DashboardPage from "../Pages/Dashboard/DashboardPage";
import UsersPage from "../Pages/Users/UsersPage";
import SettingsPage from "../Pages/SettingsPage";
import UploadPage from "../Pages/upload/UploadPage";
import ViewContent from "../ViewContent";
import PageNotFound from "../../PageNotFound";
import FeedbackPage from "../Pages/Feeback/FeedbackPage";
import Reports from "../Pages/Reports/Reports";
import Notification from "../Pages/Notifications/Notifications";
import AdminContributions from "../Pages/Contributions/AdminContributions"
const AdminRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/upload/*" element={<UploadPage />} />
        <Route path="/view-content/*" element={<ViewContent />} />
        <Route path="/feedbacks" element={<FeedbackPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/check-contributions" element={<AdminContributions />} />
        
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminRoutes;
