const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BugReports = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BugReport", BugReports);
