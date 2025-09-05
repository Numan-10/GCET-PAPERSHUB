const Review = require("../Models/Review");
const User = require("../Models/User");
const { createActivity } = require("./ActivityController");
module.exports.submitReview = async (req, res) => {
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
    await createActivity("Review", Existuser.username, Existuser.email);
    return res.status(200).json({
      message: "Your feedback helps us improve!",
      success: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to submit feeback.", success: false });
  }
};

module.exports.fetchReviews = async (req, res, next) => {
  try {
    const feedbacks = await Review.find();
    return res.json({ feedbacks, success: true });
  } catch (err) {
    return res.json({ err, success: false });
  }
};

module.exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const deletedReview = await Review.findByIdAndDelete({ _id: id });
    if (deletedReview) {
      return res.json({ message: "Review deleted!", success: true });
    }
  } catch (err) {
    // console.log(err);
    return res.json({ message: "Somthing went Wrong!", success: false });
  }
};
