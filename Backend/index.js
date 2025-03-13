require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Paper = require("./Models/Paper");
const Content = require("./Models/Content");
const cors = require("cors");
const multer = require("multer");
const { storage } = require("./cloudConfig");
const upload = multer({
  storage,
}).single("Pdf");
const cookieParser = require("cookie-parser");
const userVerification = require("./Middlewares/AuthMiddleware");
const { isAdmin } = require("./Middlewares/isAdmin");
const AuthRouter = require("./Routes/AuthRoute");
const GoogleAuth = require("./Routes/GoogleAuth");
const ReviewRoute = require("./Routes/ReviewRoute");
const ContentRoute = require("./Routes/ContentRoute");

const app = express();

const PORT = process.env.PORT || 3000;
const Url = process.env.MONGO_URL;
const PROD_URL = process.env.FRONTEND_URL;
const LOCAL_URL = process.env.LOCAL_FRONTEND_URL;
console.log(PROD_URL, LOCAL_URL);
app.use(express.json());
app.use(
  cors({
    origin: [PROD_URL, LOCAL_URL],
    // origin: ["https://gcet-papershub.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

async function main() {
  await mongoose.connect(Url);
}
main()
  .then((res) => {
    console.log("Connected to DB");
    // console.log("Current Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/test", async (req, res) => {
//   try {
//     await Content.deleteMany({});
//     await Content.insertMany([
//       { subject: "Mathematics" },
//       { subject: "Physics" },
//       { subject: "Chemistry" },
//       { subject: "Engineering Mechanics" },
//       { subject: "Computer Programming" },
//       { subject: "Data Structures and Algorithms" },
//       { subject: "Digital Logic Design" },
//       { subject: "Computer Organization and Architecture" },
//       { subject: "Database Management Systems" },
//       { subject: "Operating Systems" },
//       { subject: "Software Engineering" },
//       { subject: "Microprocessors and Microcontrollers" },
//       { subject: "Design and Analysis of Algorithms" },
//       { subject: "Computer Networks" },
//       { subject: "Machine Learning" },
//     ]);
//   } catch (err) {
//     console.log(err);
//   }
//   res.send("Data uploaded!");
// });

app.get("/subjects", async (req, res) => {
  try {
    const data = await Paper.find({});
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/verify", userVerification, isAdmin);

app.post("/upload", upload, async (req, res) => {
  try {
    // console.log(req);
    const { Title, Subject, Semester } = req.body.paper;
    let Url = req.file.path;
    let filename = req.file.filename;
    const newdata = new Paper({
      Title,
      Subject,
      Semester,
    });
    newdata.Pdf = { Url, filename };
    await newdata
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Data Uploaded Successfully" })
      );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to save the Data" });
  }
});

// ------------> Auth <---------------

app.use("/", AuthRouter);

//Google Auth
app.use("/auth", GoogleAuth);
//Review
app.use("/review", userVerification, ReviewRoute);
//Content
app.use("/content", ContentRoute);

// ------------> Endpoint for fetching sun details <---------------

app.get("/subjects/:id", userVerification, async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("backend " + id);
    const subject = await Paper.findById(id);
    // console.log(subject);
    if (subject) {
      res.json(subject);
    } else {
      res.json({ message: "Subject Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, (req, res) => {
  console.log(`App listing on port ${PORT}`);
});
