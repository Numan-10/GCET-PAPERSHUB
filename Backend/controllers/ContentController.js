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
