const Order = require("../Modules/order.module");
const Cart = require("../Modules/cart.module");

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty!" });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);

    const order = new Order({
      userId: req.userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      totalAmount
    });

    await order.save();

    // Clear cart after placing order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: order
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const getMyOrders = async (req, res) => {
    try {
        //This line retrieves all orders for the currently logged-in user and sorts them by the time they were created, showing the most recent orders first.
      const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  
//for admin
  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate("userId", "username email").sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };




  const updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
  
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ success: true, message: "Order status updated", data: order });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
  };
  