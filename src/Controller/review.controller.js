const Review = require("../Modules/review.module");
const Product = require("../Modules/product.module");

// Add a review
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const review = new Review({
      productId,
      userId: req.userId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      data: review,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { rating, comment },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, message: "Review updated", data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate("userId", "username");
    res.json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  addReview,
  updateReview,
  deleteReview,
  getProductReviews,
};
