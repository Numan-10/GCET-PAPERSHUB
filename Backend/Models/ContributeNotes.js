const mongoose = require("mongoose");

const contributeNotesSchema = new mongoose.Schema(
  {
    semester: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      required: true,
      enum: ["notes", "paper"],
    },
    Pdf: {
      Url: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
    },
    uploadedBy: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const ContributeNotes = mongoose.model("ContributeNotes", contributeNotesSchema);
module.exports = ContributeNotes;
