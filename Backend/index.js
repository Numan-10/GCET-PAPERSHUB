require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const userVerification = require("./Middlewares/AuthMiddleware");
const AuthRouter = require("./Routes/AuthRoute");
const GoogleAuth = require("./Routes/GoogleAuth");
const ReviewRoute = require("./Routes/ReviewRoute");
const ContentRoute = require("./Routes/ContentRoute");
const PaperRoute = require("./Routes/PaperRoute");
const AdminRoute = require("./Routes/AdminRoute");
const contributeRoutes = require("./Routes/contributeRoutes");
const app = express();

const PORT = process.env.PORT || 3000;
const Url = process.env.MONGO_URL;
const PROD_URL = process.env.FRONTEND_URL;
const LOCAL_URL = process.env.LOCAL_FRONTEND_URL;
const EXTRA_ORIGINS = process.env.CORS_ORIGINS || "";

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://gcet-papershub-frontend.onrender.com",
    // origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);


app.use(cookieParser());
require("./utils/passport");
app.use(passport.initialize());

async function main() {
  if (!Url) {
    throw new Error("MONGO_URL is not set");
  }
  await mongoose.connect(Url);
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

//Subjects
app.use("/", PaperRoute);
//Auth
app.use("/", AuthRouter);
//Google Auth
app.use("/auth", GoogleAuth);
//Content
app.use("/content", ContentRoute);
//Review
app.use("/review", ReviewRoute);
// Admin
app.use("/", AdminRoute);
// Contribute Papers/Notes
app.use("/", contributeRoutes);

app.listen(PORT, (req, res) => {
  console.log(`App listing on port ${PORT}`);
});
