const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pdf: {
    Url: String,
    filename: String,
  },
});

const UnitModel = mongoose.model("Unit", UnitSchema);
module.exports = UnitModel;
