import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./utils/authCookies";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const authenticated = isAuthenticated();

  const rawParams = location.hash?.startsWith("#")
    ? location.hash.slice(1)
    : location.search;
  const params = new URLSearchParams(rawParams);
  const hasOauthParams = Boolean(params.get("oauth"));

  if (hasOauthParams) {
    return children;
  }

  return authenticated ? <Navigate to={"/home"} replace /> : children;
};
export default PublicRoute;
