const express = require("express");
const router = express.Router();
const controller = require("../Controller/product.controller");
// const { checkUser } = require("../middlewares/auth.middleware.js");
const { requireAdmin } = require("../middlewares/auth.middleware.js");

// Public Routes
router.get("/",controller.getAllProducts); // get all products with filters
router.get("/:id", controller.getProductById); // get single product

// Admin-only Routes
router.post("/",  requireAdmin, controller.createProduct); // create product
router.put("/:id", requireAdmin, controller.updateProduct); // update product
router.delete("/:id",requireAdmin, controller.deleteProduct); // delete product

module.exports = router;
