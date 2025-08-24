const Content = require("../Models/Content");
const Unit = require("../Models/Unit");
module.exports.Content = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 12;
    const totalSubjects = await Content.countDocuments();
    const totalPages = Math.max(Math.ceil(totalSubjects / perPage), 1);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "Page Not Found", success: false });
    }
    // ------------->Subjects that will be displayed on the page<---------
    const subjects = await Content.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return res.status(200).json({ subjects, page, totalPages });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to Fetch Subjects!", success: false });
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

    const sub = await Content.findOne({ subject }).populate("units");
    if (!sub) {
      return res
        .status(500)
        .json({ message: "Subject Not Found!", success: false });
    }

    return res
      .status(200)
      .json({ message: "Data Found", success: true, subDetails: sub });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Somthing Went wrong!", success: false });
  }
};

//content/new
module.exports.newSubject = async (req, res) => {
  try {
    const { subject, semester } = req.body;
    if (!subject || !semester) {
      return res
        .status(500)
        .json({ message: "All fields are required", success: false });
    }
    const newSubject = new Content({
      subject: subject,
      semester: semester,
    });
    newSubject.save();

    return res.status(200).json({ message: "Subject Created!", success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Somthing went wrong", success: false });
  }
};

//Uplaoding Notes
module.exports.newUnit = async (req, res) => {
  try {
    const subject = req.params.sub;
    const Url = req.file.path;
    const filename = req.file.filename;
    const { name, unit } = req.body.Unit;

    const content = await Content.findOne({ subject });

    if (content && Url) {
      const newUnit = new Unit({
        name,
        unit,
        pdf: { Url, filename },
      });
      await newUnit.save();
      content.units.push(newUnit);
      await content.save();
    }

    if (!name || !unit) {
      return res
        .status(500)
        .json({ message: "All fields are required", success: false });
    }

    return res
      .status(200)
      .json({ message: "Unit added successfully", success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An Error Occured!", success: false });
  }
};
