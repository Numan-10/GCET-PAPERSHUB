const express = require("express");
const passport = require("passport");
const router = express.Router();
const { createSecretToken } = require("../utils/SecretToken");
const { setAuthCookies } = require("../utils/authCookies");
const { createActivity } = require("../controllers/ActivityController");
const {
  getFrontendUrl,
  isGoogleConfigured,
  isGithubConfigured,
} = require("../utils/passport");

const buildRedirect = (provider, success, message) => {
  const params = new URLSearchParams({
    oauth: provider,
    success: success ? "true" : "false",
  });
  if (message) params.set("message", message);
  return `${getFrontendUrl()}/login#${params}`;
};

const handleAuthCallback = (provider) => async (req, res, next) => {
  const strategy = provider === "google" ? "google" : "github";

  if (provider === "google" && !isGoogleConfigured()) {
    return res.redirect(
      buildRedirect(provider, false, "Google OAuth is not configured on server"),
    );
  }

  if (provider === "github" && !isGithubConfigured()) {
    return res.redirect(
      buildRedirect(provider, false, "GitHub OAuth is not configured on server"),
    );
  }

  const hasStrategy = Boolean(passport._strategy(strategy));
  if (!hasStrategy) {
    return res.redirect(
      buildRedirect(
        provider,
        false,
        `${provider} OAuth strategy is not initialized. Check env and restart server.`,
      ),
    );
  }

  passport.authenticate(strategy, { session: false }, async (err, user, info) => {
    if (err || !user) {
      const message = info?.message || `${provider} login failed`;
      return res.redirect(buildRedirect(provider, false, message));
    }

    try {
      const token = createSecretToken(user._id, user.role);
      setAuthCookies(res, {
        token,
        user: user.username,
        role: user.role,
        email: user.email,
      });

      await createActivity(
        provider === "google" ? "Google Login" : "GitHub Login",
        user.username,
        user.email,
      );

      return res.redirect(buildRedirect(provider, true));
    } catch (error) {
      return res.redirect(buildRedirect(provider, false, `${provider} login failed`));
    }
  })(req, res, next);
};

router.get("/google", (req, res, next) => {
  if (!isGoogleConfigured()) {
    return res
      .status(500)
      .json({ message: "Google OAuth is not configured on server", success: false });
  }
  if (!passport._strategy("google")) {
    return res.status(500).json({
      message: "Google OAuth strategy is not initialized. Restart the server.",
      success: false,
    });
  }

  return passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  })(req, res, next);
});

router.get("/google/callback", handleAuthCallback("google"));

router.get("/github", (req, res, next) => {
  if (!isGithubConfigured()) {
    return res
      .status(500)
      .json({ message: "GitHub OAuth is not configured on server", success: false });
  }
  if (!passport._strategy("github")) {
    return res.status(500).json({
      message: "GitHub OAuth strategy is not initialized. Restart the server.",
      success: false,
    });
  }

  return passport.authenticate("github", {
    session: false,
    scope: ["read:user", "user:email"],
  })(req, res, next);
});

router.get("/github/callback", handleAuthCallback("github"));

module.exports = router;
