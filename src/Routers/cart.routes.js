const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = require("../Controller/cart.controller");

// Add to cart
router.post("/add", addToCart);

// Get cart
router.get("/", getCart);

// Remove item from cart
router.delete("/remove/:productId", removeFromCart);

// Update quantity
router.put("/update/:productId", updateCartItem);

// Clear cart
router.delete("/clear", clearCart);

module.exports = router;
