const ContributeNotes = require("../Models/ContributeNotes");
const { cloudinary } = require("../cloudConfig");
// new contribution
module.exports.UploadContributeNotes = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    const { tag, uploadedBy, semester, subject } = req.body;

    if (!tag || !["notes", "paper"].includes(tag)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tag. Must be 'notes' or 'paper'",
      });
    }

    let Url = req.file.path;
    let filename = req.file.filename;

    const newContributeNote = new ContributeNotes({
      tag,
      Pdf: { Url, filename },
      uploadedBy: uploadedBy,
      semester: semester,
      subject: subject,
    });

    await newContributeNote.save();

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: newContributeNote,
    });
  } catch (err) {
    console.error("Error uploading contribute notes:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to upload the file. Please try again.",
      error: err.message,
    });
  }
};

//get all contributions
module.exports.GetAllContributions = async (req, res) => {
  try {
    const allNotes = await ContributeNotes.find().sort({
      uploadedAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: allNotes.length,
      data: allNotes,
    });
  } catch (err) {
    console.error("Error fetching contributions:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contributions",
      error: err.message,
    });
  }
};

// Delete contribution
module.exports.DeleteContribution = async (req, res) => {
  try {
    const { id } = req.params;

    const contribution = await ContributeNotes.findById(id);

    if (!contribution) {
      return res.status(404).json({
        success: false,
        message: "Contribution not found",
      });
    }

    await cloudinary.uploader.destroy(contribution.Pdf.filename, {
      resource_type: "raw",
    });

    await ContributeNotes.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Contribution deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting contribution:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete contribution",
      error: err.message,
    });
  }
};
