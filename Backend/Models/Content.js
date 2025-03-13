const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema =new Schema ({
  subject: {
    type: String,
    required: true,
  },
});

const contentModel = mongoose.model("content", contentSchema);
module.exports = contentModel;
