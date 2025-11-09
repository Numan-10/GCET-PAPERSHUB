const Content = require("../Models/Content");
const Unit = require("../Models/Unit");
const { cloudinary } = require("../cloudConfig");
// const Subject = require("../Models/Paper");
const { createActivity } = require("./ActivityController");
module.exports.Content = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    // console.log(search);
    const perPage = 8;

    let searchCondition = {};
    if (search) {
      searchCondition = {
        subject: {
          $regex: search,
          $options: "i",
        },
      };
    }

    const totalSubjects = await Content.countDocuments(searchCondition);
    const totalPages = Math.max(Math.ceil(totalSubjects / perPage), 1);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "Page Not Found", success: false });
    }
    // ------------->Subjects that will be displayed on the page<---------
    const subjects = await Content.find(searchCondition)
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
    // await createActivity("Signed Up", user.username, user.email);

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
    // await createActivity("Signed Up", user.username, user.email);
    return res
      .status(200)
      .json({ message: "Unit added successfully", success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An Error Occured!", success: false });
  }
};

// getAllsubs
module.exports.fetchSubs = async (req, res, next) => {
  try {
    const subjects = await Content.find().populate("units");
    if (subjects) {
      return res.json({ subjects, success: true });
    }
  } catch (err) {
    console.log(err);
    return res.json({ err, success: false });
  }
};

// Delete notes
module.exports.DeleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Subject = await Content.findById(id).populate("units");
    for (const unit of Subject.units) {
      // console.log(unit);
      if (unit.pdf?.filename) {
        await cloudinary.uploader.destroy(unit.pdf.filename);
      }
    }
    await Unit.deleteMany({ _id: { $in: Subject.units.map((u) => u._id) } });

    await Content.findByIdAndDelete(id);
    // console.log(Subject);
    return res.json({ message: "Subject Deleted!", success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};
// Delete Unit
module.exports.DeleteUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUnit = await Unit.findById(id);
    if (!Unit) {
      return res.json({ message: "Unit not found", success: false });
    }

    if (existingUnit.pdf?.filename) {
      await cloudinary.uploader.destroy(existingUnit.pdf.filename);
    }
    await Content.updateMany({}, { $pull: { units: id } });
    await Unit.findByIdAndDelete(id);

    return res.json({ message: "Unit Deleted!", success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, success: false });
  }
};

// Update Subject
module.exports.UpdateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, semester } = req.body;

    if (!subject || !semester) {
      return res.status(400).json({
        success: false,
        message: "Subject name and semester are required",
      });
    }

    const updatedSubject = await Content.findByIdAndUpdate(
      id,
      { subject, semester },
      { new: true, runValidators: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      data: updatedSubject,
    });
  } catch (err) {
    console.error("Error updating subject:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update subject",
      error: err.message,
    });
  }
};

// Update Unit

module.exports.UpdateUnit = async (req, res) => {
  try {
    const { unitId } = req.params;
    const { unit, name } = req.body;

    if (!unit || !name) {
      return res.status(400).json({
        success: false,
        message: "Unit number and name are required",
      });
    }

    const existingUnit = await Unit.findById(unitId);
    if (!existingUnit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    existingUnit.unit = unit;
    existingUnit.name = name;

    if (req.file) {
      if (existingUnit.pdf?.filename) {
        try {
          await cloudinary.uploader.destroy(existingUnit.pdf.filename, {
            resource_type: "raw",
          });
        } catch (err) {
          console.log("Error deleting old PDF:", err);
        }
      }

      existingUnit.pdf = {
        Url: req.file.path,
        filename: req.file.filename,
      };
    }

    await existingUnit.save();

    res.status(200).json({
      success: true,
      message: "Unit updated successfully",
      data: existingUnit,
    });
  } catch (err) {
    console.error("Error updating unit:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update unit",
      error: err.message,
    });
  }
};
