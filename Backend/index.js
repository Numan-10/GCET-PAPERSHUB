const express = require("express");
const mongoose = require("mongoose");
const Paper = require("./Models/Paper");
const cors = require("cors");

const app = express();

const PORT = 3000;

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

app.listen(PORT, (req, res) => {
  console.log(`App listing on port ${PORT}`);
});
