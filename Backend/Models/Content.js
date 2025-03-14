const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  units: [
    {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
  ],
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const contentModel = mongoose.model("content", contentSchema);
module.exports = contentModel;
