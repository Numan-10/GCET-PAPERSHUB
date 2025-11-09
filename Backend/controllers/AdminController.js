const User = require("../Models/User");
const BugReport = require("../Models/BugReport");
const Notification = require("../Models/Notification");
const Review = require("../Models/Review");

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
    next();
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
    console.log(err);
    return res.json({ message: err.message, success: false });
  }
};

// GET /notifications - This will serve as updates for users
// Improved fetch with sorting
module.exports.fetchNotification = async (req, res, next) => {
  try {
    const notifications = await Notification.find();

    return res.json({
      notifications,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: "Failed to fetch notifications",
      success: false,
    });
  }
};

// Create notification - remove pdf handling
module.exports.createNotification = async (req, res, next) => {
  try {
    const { message, link } = req.body;

    if (!message || !message.trim()) {
      return res.json({ message: "Message is required", success: false });
    }

    const notification = await Notification.create({
      message: message.trim(),
      link: link || "",
    });

    return res.json({
      message: "Notification created successfully!",
      success: true,
      notification,
    });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};

// Update notification - remove pdf handling
module.exports.updateNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message, link } = req.body;

    if (!message || !message.trim()) {
      return res.json({ message: "Message is required", success: false });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      {
        message: message.trim(),
        link: link || "",
      },
      { new: true, runValidators: true }
    );

    if (!updatedNotification) {
      return res.json({ message: "Notification not found", success: false });
    }

    return res.json({
      message: "Notification updated successfully!",
      success: true,
      notification: updatedNotification,
    });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};

// Delete notification
module.exports.deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.json({ message: "Notification not found", success: false });
    }

    return res.json({
      message: "Notification deleted successfully!",
      success: true,
    });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};

// Growth
module.exports.getGrowthData = async (req, res) => {
  try {
    const totalBugs = await BugReport.countDocuments();
    const totalReviews = await Review.countDocuments();

    res.status(200).json({
      totalBugs,
      totalReviews
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};
