module.exports.ReviewController = (req, res) => {
  //   res.send("Controller is yeah Working!");
  try {
    const { value, comment } = req.body;
    console.log(value, comment);
    if (comment && value) {
      return res
        .status(200)
        .json({ message: "Review submitted!", success: true });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to submit review.", success: false });
  }
};
