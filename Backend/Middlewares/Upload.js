const { storage } = require("../cloudConfig");
const multer = require("multer");
module.exports.upload = multer({
  storage,
}).single("Pdf");
