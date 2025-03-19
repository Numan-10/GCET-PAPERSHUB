const Review = require("../Models/Review");
const User = require("../Models/User");

module.exports.ReviewController = async (req, res) => {
  try {
    const currUser = req.user;

    const { value, comment, user, createdAt } = req.body;

    const Existuser = await User.findById(currUser.id);

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

    return res.status(200).json({
      message: "Review Submitted!",
      success: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to submit review.", success: false });
  }
};
