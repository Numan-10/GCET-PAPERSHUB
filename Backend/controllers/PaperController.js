const Paper = require("../Models/Paper");
module.exports.Subjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const search = req.query.search || "";
    const perPage = 8;
    //  $or: [
    //           { Subject: { $regex: search, $options: "i" } },
    //           { Title: { $regex: search, $options: "i" } },
    //         ],
    let searchCondition = {};
    if (search) {
      searchCondition = {
        Subject: { $regex: search, $options: "i" },
      };
    }

    const totalPapers = await Paper.countDocuments(searchCondition);

    const totalPages = Math.max(Math.ceil(totalPapers / perPage), 1);
    if (page > totalPages) {
      return res
        .status(404)
        .json({ message: "Papers Not Found!", success: false });
    }
    const Papers = await Paper.find(searchCondition)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    return res.status(200).json({ Papers, page, totalPages });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch papers", success: false });
  }
};

//Upload Paper

module.exports.UploadPaper = async (req, res) => {
  try {
    const paperPayload =
      req.body?.paper && typeof req.body.paper === "object"
        ? req.body.paper
        : {
            Title: req.body["paper[Title]"] || req.body.Title,
            Subject: req.body["paper[Subject]"] || req.body.Subject,
            Semester: req.body["paper[Semester]"] || req.body.Semester,
          };

    const Title = paperPayload?.Title?.trim();
    const Subject = paperPayload?.Subject?.trim();
    const Semester = paperPayload?.Semester?.trim();

    if (!Title || !Subject || !Semester) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "PDF file is required" });
    }

    let Url = req.file.path;
    let filename = req.file.filename;
    const newdata = new Paper({
      Title,
      Subject,
      Semester,
    });
    newdata.Pdf = { Url, filename };
    await newdata.save();
    // await createActivity("Signed Up", user.username, user.email);
    return res
      .status(200)
      .json({ success: true, message: "Data Uploaded Successfully" });
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

// Delete route
const { cloudinary } = require("../cloudConfig");

module.exports.DeletePaper = async (req, res, next) => {
  try {
    const id = req.query.id;
    const public_id = req.query.filename;

    if (!id || !public_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing id or filename" });
    }

    await cloudinary.uploader.destroy(public_id, { resource_type: "raw" });

    const deletePaper = await Paper.findByIdAndDelete(id);

    if (!deletePaper) {
      return res
        .status(404)
        .json({ success: false, message: "Paper not found" });
    }

    return res.json({ message: "Paper Deleted!", success: true });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};

// Update paper

module.exports.UpdatePaper = async (req, res) => {
  try {
    const { id, Subject, Semester, Title } = req.body;

    const paper = await Paper.findById(id);
    if (!paper) {
      return res
        .status(404)
        .json({ success: false, message: "Paper not found" });
    }

    paper.Subject = Subject || paper.Subject;
    paper.Semester = Semester || paper.Semester;
    paper.Title = Title || paper.Title;

    if (req.file) {
      if (paper.Pdf?.filename) {
        await cloudinary.uploader.destroy(paper.Pdf.filename, {
          resource_type: "raw",
        });
      }
      paper.Pdf = {
        Url: req.file.path,
        filename: req.file.filename,
      };
    }

    await paper.save();
    return res.json({ success: true, message: "Paper updated successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};
