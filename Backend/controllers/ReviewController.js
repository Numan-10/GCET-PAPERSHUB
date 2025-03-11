const Review = require("../Models/Review");
const User = require("../Models/User");

module.exports.ReviewController = async (req, res) => {
  //   res.send("Controller is yeah Working!");

  try {
    const currUser = req.user;
    // console.log("Review req.user: " + JSON.stringify(currUser));
    const { value, comment, user, createdAt } = req.body;
    // console.log("Review: ", value, comment, user);
    const Existuser = await User.findById(currUser.id);
    // console.log("Exist" + Existuser);

    if (!comment && !value && !user) {
      return res
        .status(500)
        .json({ message: "All fields are required!", success: false });
    }
    const newReview = new Review({
      comment,
      rating: value,
      author: user,
      createdAt,
    });
    Existuser.reviews.push(newReview);
    await newReview.save();
    await Existuser.save();

    // console.log("New User: ", Existuser);
    // console.log("New Review: ", newReview);
    res.status(200).json({
      message: "Review Submitted!",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to submit review.", success: false });
  }
};
