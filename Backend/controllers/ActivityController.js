const Act = require("../Models/RecentActivity");
module.exports.createActivity = async (action, username, email) => {
  try {
    const Activity = await Act.create({ action, username, email });
    // console.log(Activity);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports.FetchActivites = async (req, res, next) => {
  try {
    const Activites = await Act.find();
    return res.json({ Activites, success: true });
  } catch (err) {
    return res.json({ success: false, err });
  }
};
