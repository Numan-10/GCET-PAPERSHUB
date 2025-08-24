const Paper = require("../Models/Paper");
module.exports.Subjects = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 8;
    const totalPapers = await Paper.countDocuments();

    const totalPages = Math.max(Math.ceil(totalPapers / perPage), 1);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "Papers Not Found!", success: false });
    }
    const Papers = await Paper.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    return res.status(200).json({ Papers, page, totalPages });
  } catch (err) {
    return res
      .status(404)
      .json({ message: "Papers Not Found!", success: false });
  }
};

//Upload Paper

module.exports.UploadPaper = async (req, res) => {
  try {
    const { Title, Subject, Semester } = req.body.paper;
    let Url = req.file.path;
    let filename = req.file.filename;
    const newdata = new Paper({
      Title,
      Subject,
      Semester,
    });
    newdata.Pdf = { Url, filename };
    await newdata
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Data Uploaded Successfully" })
      );
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to save the Data" });
  }
};

//Show Paper
module.exports.ShowPaper = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Paper.findById(id);

    if (subject) {
      res.json(subject);
    }
  } catch (err) {
    return res.json({ message: "Subject Not Found" });
  }
};
