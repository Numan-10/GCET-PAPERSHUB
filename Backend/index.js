const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

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



app.listen(PORT, (req, res) => {
  console.log(`App listing on port ${PORT}`);
});
