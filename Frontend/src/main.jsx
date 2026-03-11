import { createRoot } from "react-dom/client";
import axios from "axios";
import AboutPage from "./Components/About/AboutPage.jsx";
import Landing from "./Components/Landing/Landing.jsx";
import UpdatePage from "./Components/Update/UpdatePage.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import UploadPage from "./Components/upload/UploadPage.jsx";
import HomePage from "./Components/Home/HomePage.jsx";
import Login from "./Components/Login/Login.jsx";
import ContentPage from "./Components/Content/ContentPage.jsx";
import "./index.css";
import SubDetails from "./Components/Details/SubDetails.jsx";
import ContributePage from "./Components/contributors/ContributePage.jsx";
import SubUnits from "./Components/Content/Subject/SubUnits.jsx";
import AdminRoutes from "./Components/Admin/AdminRoutes/AdminRoutes.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import AccessDenied from "./Components/AccessDenied.jsx";
import PublicRoute from "./PublicRoute.jsx";
import Report from "./Components/Bug/Report.jsx";
import ContributeNotes from "./Components/Contribute/ContributePage.jsx";
import ContributeGuidelines from "./Components/Contribute/ContributeGuidelines.jsx";
axios.defaults.withCredentials = true;

function Layout({ children }) {
  const location = useLocation();

  const hideNavbarFooter =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      {children}
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/contribute/*"
          element={
            <PrivateRoute requiredRole={["admin", "manager", "user"]}>
              <ContributeNotes />
            </PrivateRoute>
          }
        />

        <Route
          path="/home/:id"
          element={
            <PrivateRoute>
              <SubDetails />
            </PrivateRoute>
          }
        />
        <Route path="/Author" element={<ContributePage />} />
        <Route path="/updates" element={<UpdatePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/upload" element={<UploadPage />} /> */}
        <Route path="/unauthorized" element={<AccessDenied />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/content" element={<ContentPage />} />
        <Route
          path="/content/:subject"
          element={
            <PrivateRoute requiredRole={["admin", "manager", "user"]}>
              <SubUnits />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute requiredRole={["admin", "manager"]}>
              <AdminRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute requiredRole={["admin", "manager", "user"]}>
              <Report />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
