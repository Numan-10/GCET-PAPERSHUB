import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children, requiredRole }) => {
  const role = localStorage?.getItem("role");
  const token = localStorage?.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  if (requiredRole && !requiredRole.includes(role)) {
    return <Navigate to={"/unauthorized"} replace />;
  }
  return children;
};

export default PrivateRoute;
