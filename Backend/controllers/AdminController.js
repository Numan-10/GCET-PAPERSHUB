const User = require("../Models/User");
const BugReport = require("../Models/BugReport");
module.exports.ChangeRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newRole = req.body.role;
    const UpdatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { role: newRole } }, // $set: user fo changing one doucment--good prtc
      { new: true }, //return new doc
      { runValidators: true } //ensures validation during updation
    );
    if (!UpdatedUser) {
      return res.json({ success: false });
    }
    // console.log("UpdatedUser", UpdatedUser);
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false });
  }
};

module.exports.FetchUsers = async (req, res, next) => {
  try {
    const Users = await User.find();

    // Total
    const TotalUsers = await User.countDocuments();

    // Last Seven
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const last7DaysCount = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });
    // Today
    const startofDay = new Date();
    startofDay.setHours(0, 0, 0, 0);
    const endofDay = new Date();
    endofDay.setHours(23, 59, 59, 999);

    const todayCount = await User.countDocuments({
      createdAt: { $gte: startofDay, $lte: endofDay },
    });

    return res.json({
      Users,
      success: true,
      TotalUsers,
      last7DaysCount,
      todayCount,
    });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Somthing went wrong", success: false });
  }
};

module.exports.DeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.json({ message: "User not found!", success: false });
    }
    // console.log(deletedUser);
    return res.json({ message: "User deleted.", success: true });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Somthing went wrong", success: false });
  }
};

module.exports.PostBug = async (req, res, next) => {
  try {
    const { title, description, priority, email } = req.body;
    if (!title) {
      return res.json({ message: "Title is required", success: false });
    }
    if (!description) {
      return res.json({ message: "Description is required", success: false });
    }
    if (!priority) {
      return res.json({ message: "Priority is required", success: false });
    }
    if (!email) {
      return res.json({ message: "Email is required", success: false });
    }
    // console.log(title, description, priority, email);
    const Bugreport = await BugReport.create({
      title,
      description,
      priority,
      email,
    });
    // console.log(Bugreport);
    return res.json({ message: "Bug reported!", success: true });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};

module.exports.FetchBugs = async (req, res, next) => {
  try {
    const reports = await BugReport.find();
    return res.json({ reports, success: true });
  } catch (err) {
    return res.json({ message: "Failed to Fetch!", success: false });
  }
};

module.exports.DeleteBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log("dletebyg", id);
    const DeletedBug = await BugReport.findByIdAndDelete({ _id: id });
    console.log(DeletedBug);
    return res.json({ message: "Bug Deleted!", success: true });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};
