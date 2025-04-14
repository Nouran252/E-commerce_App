// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  subcategory: { type: String },
  quantity:    { type: Number, required: true },
  images:      [String], // Cloudinary URLs
  ratings:     { type: Number, default: 0 },
  numReviews:  { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
