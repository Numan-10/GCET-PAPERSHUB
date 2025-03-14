const Content = require("../Models/Content");
const Unit = require("../Models/Unit");

module.exports.Content = async (req, res) => {
  try {
    const subjects = await Content.find({});
    res.json(subjects);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Units = async (req, res) => {
  try {
    const { subject } = req.params;
    if (!subject) {
      return res
        .status(500)
        .json({ message: "Subject isn't Valid!", success: false });
    }
    // console.log(subject);
    const sub = await Content.findOne({ subject }).populate("units");
    if (!sub) {
      return res
        .status(500)
        .json({ message: "Subject Not Found!", success: false });
    }
    // console.log(sub);
    return res
      .status(200)
      .json({ message: "Data Found", success: true, subDetails: sub });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Somthing Went wrong!", success: false });
  }
};
