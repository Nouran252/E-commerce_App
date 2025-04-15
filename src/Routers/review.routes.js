const express = require("express");
const router = express.Router();
const {
  addReview,
  updateReview,
  deleteReview,
  getProductReviews,
} = require("../Controller/review.controller");


// Add a new review
router.post("/", addReview);

// Update a review
router.put("/:id", updateReview);

// Delete a review
router.delete("/:id", deleteReview);

// Get all reviews for a specific product
router.get("/:productId", getProductReviews);

module.exports = router;
