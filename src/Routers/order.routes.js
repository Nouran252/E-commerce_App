const express = require("express");
const router = express.Router();
const { requireAdmin } = require("../middlewares/auth.middleware");
const orderController = require("../Controller/order.controller");

// user Routes
router.post("/", checkUser, orderController.createOrder);
router.get("/", checkUser, orderController.getMyOrders);

// Admin Routes
router.get("/all", requireAdmin, orderController.getAllOrders);
router.put("/update-status/:orderId", requireAdmin, orderController.updateOrderStatus);

module.exports = router;
