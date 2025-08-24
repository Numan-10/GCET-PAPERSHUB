const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ActivitySchema = new Schema({
  action: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: "10d" }, // usin mongo TTL for auto deltion after 30 dys
  },
});

const ActivityModel = mongoose.model("Activity", ActivitySchema);
module.exports = ActivityModel;
