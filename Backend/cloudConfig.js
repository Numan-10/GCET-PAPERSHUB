require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "Papers_HUB",
      format: "pdf",
      public_id: file.originalname.replace(/\.[^/.]+$/, ""),
      use_filename: true,
      unique_filename: false,
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
