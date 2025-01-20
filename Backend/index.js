const express = require("express");
const mongoose = require("mongoose");
const Paper = require("./Models/Paper");
const cors = require("cors");

const app = express();

const PORT = 3000;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/papers");
}
main()
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

try {
  app.get("/subjects", async (req, res) => {
    const data = await Paper.find({});
    res.send(data);
  });
} catch (Err) {
  console.log(Err);
}

app.post("/upload", async (req, res) => {
  const newdata = new Paper({
    Title: req.body.Title,
    Subject: req.body.Subject,
    Semester: req.body.Semester,
  });
  await newdata
    .save()
    .then(() => res.status(200).send("Data received successfully"))
    .catch((err) => res.status(500).send("Failed to save order: " + err));
});
app.listen(PORT, (req, res) => {
  console.log(`App listing on port ${PORT}`);
});
