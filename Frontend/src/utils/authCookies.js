const getCookieValue = (key) => {
  const name = `${key}=`;
  const decoded = decodeURIComponent(document.cookie || "");
  const parts = decoded.split(";");

  for (let i = 0; i < parts.length; i += 1) {
    const cookie = parts[i].trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return "";
};

export const getAuthUser = () => getCookieValue("user");
export const getAuthRole = () => getCookieValue("role");
export const getAuthEmail = () => getCookieValue("email");

export const isAuthenticated = () => Boolean(getAuthUser());

export const clearReadableAuthCookies = () => {
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  document.cookie = `user=; ${expires}`;
  document.cookie = `role=; ${expires}`;
  document.cookie = `email=; ${expires}`;
};
