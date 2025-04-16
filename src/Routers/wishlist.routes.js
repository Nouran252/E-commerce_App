const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
} = require("../Controller/wishlist.controller");


router.post("/", addToWishlist);
router.get("/", getMyWishlist);
router.delete("/:productId", removeFromWishlist);

module.exports = router;
