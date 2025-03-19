require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Paper = require("./Models/Paper");
const cors = require("cors");
// const multer = require("multer");
// const { storage } = require("./cloudConfig");
const { upload } = require("./Middlewares/Upload");
// const upload = multer({
//   storage,
// }).single("Pdf");
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
    origin: [PROD_URL],
    // origin: [LOCAL_URL],
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

//Units & Content Model
// const UnitModel = require("./Models/Unit");
// const ContentModel = require("./Models/Content");

// app.get("/test", async (req, res) => {
//   try {
//     // await Content.deleteMany({});
//     let Units = await UnitModel.insertMany([
//       {
//         name: "Unit 1",
//         unit: "Introduction to Databases",
//         pdf: { Url: "unit1.pdf", filename: "unit1" },
//       },
//       {
//         name: "Unit 2",
//         unit: "SQL and NoSQL",
//         pdf: { Url: "unit2.pdf", filename: "unit2" },
//       },
//     ]);
//     console.log("Inserted Units:", Units);
//     const Content = await ContentModel.create({
//       subject: "Database Management Systems (DBMS)",
//       semester: "5th",
//       units: Units.map((unit) => unit._id),
//     });
//     console.log(Content);
//     await Content.save();

//     return res.json({ message: "Data successfullly Uploaded!", sucess: true });
//   } catch (err) {
//     console.log(err);
//     return res.json({ message: "something Went wrong!", sucess: false, err });
//   }
// });

app.get("/subjects", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 3;
    const totalPapers = await Paper.countDocuments();

    const totalPages = Math.ceil(totalPapers / perPage);
    const Pages = [];
    for (let i = 0; i < totalPages; i++) {
      Pages.push(i + 1);
    }
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "Papers Not Found!", success: false });
    }
    const Papers = await Paper.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    return res.status(200).json({ Papers, page, totalPages, Pages });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ message: "Papers Not Found!", success: false });
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
//Content
app.use("/content", ContentRoute);
//Review
app.use("/review", userVerification, ReviewRoute);

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
