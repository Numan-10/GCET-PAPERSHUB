const rawBaseUrl =
  import.meta.env.VITE_APP_BACKEND_URL ||
  import.meta.env.VITE_APP_LOCAL_BACKEND_URL ||
  "http://localhost:3000";

const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export default API_BASE_URL;
