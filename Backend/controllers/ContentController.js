const Content = require("../Models/Content");
const Unit = require("../Models/Unit");
module.exports.Content = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const totalSubjects = await Content.countDocuments();
    const totalPages = Math.ceil(totalSubjects / perPage);
    const Pages = [];
    for (i = 0; i < totalPages; i++) {
      Pages.push(i + 1);
    }
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

    return res.status(200).json({ subjects, page, totalPages, Pages });
    // const subjects = await Content.find({});
    // res.json(subjects);
  } catch (err) {
    console.log(err);
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

//content/new
module.exports.newSubject = async (req, res) => {
  try {
    const { form } = req.body;
    const subject = form.subject;
    const semester = form.semester;
    if (!subject || !semester) {
      return res
        .status(500)
        .json({ message: "All fields are required", success: false });
    }
    console.log(form.subject);
    console.log(form.semester);
    const newSubject = new Content({
      subject: subject,
      semester: semester,
    });
    newSubject.save();
    console.log(newSubject);

    return res.status(200).json({ message: "Subject Created!", success: true });
  } catch (err) {
    console.log(err);
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
    // console.log(name, unit, subject);
    const content = await Content.findOne({ subject });
    // console.log("content Found :", content);
    // console.log("URl And Filename:", Url, filename);
    if (content && Url) {
      // console.log(content);
      const newUnit = new Unit({
        name,
        unit,
        pdf: { Url, filename },
      });
      await newUnit.save();
      content.units.push(newUnit);
      await content.save();
      console.log("New Unit", newUnit);
      console.log("New Content", content);
    }

    if (!name || !unit) {
      return res
        .status(500)
        .json({ message: "All fields are required", success: false });
    }

    // console.log(url, filename);
    return res
      .status(200)
      .json({ message: "Unit added successfully", success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An Error Occured!", success: false });
  }
};
