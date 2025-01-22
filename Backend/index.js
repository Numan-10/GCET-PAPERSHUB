require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Paper = require("./Models/Paper");
const cors = require("cors");
const multer = require("multer");
const { storage } = require("./cloudConfig");
const upload = multer({ storage });

const app = express();

const PORT = process.env.PORT || 3000;

const Url = process.env.MONGO_URL;
console.log("MongoDB URL:", Url);
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

async function main() {
  await mongoose.connect(Url);
}
main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/subjects", async (req, res) => {
  try {
    const data = await Paper.find({});
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// Upload
app.post("/upload", upload.single("Pdf"), async (req, res) => {
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
    res
      .status(500)
      .json({ success: false, message: "Failed to save the Data" });
  }
});
app.listen(PORT, (req, res) => {
  console.log(`App listing on port ${PORT}`);
});
