require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const axios = require("axios");
const User = require("../Models/User");

const trimTrailingSlash = (url = "") => url.replace(/\/+$/, "");

const getFrontendUrl = () =>
  trimTrailingSlash(
    process.env.FRONTEND_URL ||
      process.env.LOCAL_FRONTEND_URL ||
      "https://gcet-papershub-frontend.onrender.com",
  );

const getBackendUrl = () =>
  trimTrailingSlash(
    process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3000}`,
  );

const getGoogleCallbackUrl = () =>
  trimTrailingSlash(
    process.env.GOOGLE_CALLBACK_URL || `${getBackendUrl()}/auth/google/callback`,
  );

const getGithubCallbackUrl = () =>
  trimTrailingSlash(
    process.env.GITHUB_CALLBACK_URL || `${getBackendUrl()}/auth/github/callback`,
  );

const getGoogleClientId = () =>
  process.env.GOOGLE_CLIENT_ID || process.env.CLIENT_ID;

const getGoogleClientSecret = () =>
  process.env.GOOGLE_CLIENT_SECRET || process.env.CLIENT_SECRET;

const isGoogleConfigured = () =>
  Boolean(getGoogleClientId() && getGoogleClientSecret());

const isGithubConfigured = () =>
  Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);

const upsertUser = async ({ email, username, image }) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      email,
      username,
      image,
    });
  }
  return user;
};

if (isGoogleConfigured()) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: getGoogleClientId(),
        clientSecret: getGoogleClientSecret(),
        callbackURL: getGoogleCallbackUrl(),
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile?.emails?.[0]?.value;
          if (!email) {
            return done(null, false, {
              message: "Unable to fetch email from Google account",
            });
          }

          const username =
            profile?.displayName || email.split("@")[0] || "user";
          const image = profile?.photos?.[0]?.value;

          const user = await upsertUser({ email, username, image });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
}

if (isGithubConfigured()) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: getGithubCallbackUrl(),
        scope: ["read:user", "user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let email = null;
          if (profile?.emails?.length) {
            const primary =
              profile.emails.find((entry) => entry.primary && entry.verified) ||
              profile.emails.find((entry) => entry.verified) ||
              profile.emails[0];
            email = primary?.value || primary?.email;
          }

          if (!email) {
            const { data } = await axios.get(
              "https://api.github.com/user/emails",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  Accept: "application/vnd.github+json",
                  "User-Agent": "gcet-papershub",
                },
              },
            );
            const primary =
              data?.find((entry) => entry.primary && entry.verified) ||
              data?.find((entry) => entry.verified) ||
              data?.[0];
            email = primary?.email;
          }

          if (!email) {
            return done(null, false, {
              message: "No usable email found in GitHub account",
            });
          }

          const username =
            profile?.displayName ||
            profile?.username ||
            email.split("@")[0] ||
            "user";
          const image = profile?.photos?.[0]?.value;

          const user = await upsertUser({ email, username, image });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
}

module.exports = {
  getFrontendUrl,
  getGoogleCallbackUrl,
  getGithubCallbackUrl,
  isGoogleConfigured,
  isGithubConfigured,
};
