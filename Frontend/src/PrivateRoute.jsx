import { Navigate } from "react-router-dom";
import { getAuthRole, isAuthenticated } from "./utils/authCookies";

const PrivateRoute = ({ children, requiredRole }) => {
  const role = getAuthRole();
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return <Navigate to={"/login"} replace />;
  }

  if (requiredRole && !requiredRole.includes(role)) {
    return <Navigate to={"/unauthorized"} replace />;
  }
  return children;
};

export default PrivateRoute;
