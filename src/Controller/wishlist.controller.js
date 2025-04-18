const Wishlist = require("../Modules/wishlist.module");
const Product = require("../Modules/product.module");

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.userId, products: [] });
    }

    if (wishlist.products.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    wishlist.products.push(productId);
    await wishlist.save();

    res.status(200).json({ success: true, message: "Product added to wishlist", data: wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ userId: req.userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ success: true, message: "Product removed from wishlist", data: wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user's wishlist
const getMyWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.userId }).populate("products");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({ success: true, data: wishlist.products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
};
