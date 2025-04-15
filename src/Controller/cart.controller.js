const Cart = require("../Modules/cart.module.js");
const Product = require("../Modules/product.module");

// Get user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("items.productId");
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      cart = new Cart({ user: req.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Update quantity of an item
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ msg: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.userId }, { items: [] });
    res.status(200).json({ success: true, msg: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
