const Content = require("../Models/Content");
module.exports.ContentController = async (req, res) => {
  try {
    const subjects = await Content.find({});
    res.json(subjects);
  } catch (err) {
    console.log(err);
  }
};
