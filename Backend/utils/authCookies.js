const ACCESS_TOKEN_MAX_AGE = 3 * 60 * 60 * 1000; // 3 hours

const baseCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };
};

const tokenCookieOptions = () => ({
  ...baseCookieOptions(),
  httpOnly: true,
  maxAge: ACCESS_TOKEN_MAX_AGE,
});

const profileCookieOptions = () => ({
  ...baseCookieOptions(),
  httpOnly: false,
  maxAge: ACCESS_TOKEN_MAX_AGE,
});

const clearCookieOptions = () => ({
  ...baseCookieOptions(),
  maxAge: 0,
});

const setAuthCookies = (res, { token, user, role, email }) => {
  res.cookie("token", token, tokenCookieOptions());
  res.cookie("user", user || "", profileCookieOptions());
  res.cookie("role", role || "", profileCookieOptions());
  res.cookie("email", email || "", profileCookieOptions());
};

const clearAuthCookies = (res) => {
  res.clearCookie("token", clearCookieOptions());
  res.clearCookie("user", clearCookieOptions());
  res.clearCookie("role", clearCookieOptions());
  res.clearCookie("email", clearCookieOptions());
};

module.exports = {
  setAuthCookies,
  clearAuthCookies,
};
