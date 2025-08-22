const User = require("../Models/User");
module.exports.ChangeRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newRole = req.body.role;
    const UpdatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { role: newRole } },   // $set: user fo changing one doucment--good prtc
      { new: true },              //return new doc
      { runValidators: true }            //ensures validation during updation
    );
    if (!UpdatedUser) {
      return res.json({ success: false });
    }
    console.log("UpdatedUser", UpdatedUser);
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.json({ success: false });
  }
};

module.exports.FetchUsers = async (req, res, next) => {
  try {
    const Users = await User.find();
    return res.json({ Users, success: true });
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
    console.log(deletedUser);
    return res.json({ message: "User deleted.", success: true });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Somthing went wrong", success: false });
  }
};
