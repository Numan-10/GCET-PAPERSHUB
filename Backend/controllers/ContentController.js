const Content = require("../Models/Content");
module.exports.ContentController = async (req, res) => {
  const subjects = await Content.find({});
  res.json(subjects);
};
