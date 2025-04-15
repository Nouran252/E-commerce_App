const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,        // Admin
  getUserById,        // Admin
  deleteUser,         // Admin
  updateUserRole      // Admin
} = require("../Controller/user.controller");

const { requireAdmin } = require("../middlewares/auth.middleware");

// User Routes
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

//Admin Routes
router.get("/", requireAdmin, getAllUsers);
router.get("/:id", requireAdmin, getUserById);
router.delete("/:id", requireAdmin, deleteUser);
router.patch("/role/:id", requireAdmin, updateUserRole);


module.exports = router 
