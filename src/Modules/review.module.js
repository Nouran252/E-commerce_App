// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating:    { type: Number, min: 1, max: 5 },
  comment:   { type: String },
}, { timestamps: true });

reviewSchema.index({ productId: 1, userId: 1 }, { unique: true }); // one review per user per product

module.exports = mongoose.model("Review", reviewSchema);
