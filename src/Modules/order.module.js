// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity:  { type: Number },
    }
  ],
  totalAmount: { type: Number },
  status: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered"],
    default: "Processing"
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
