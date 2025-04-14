const jwt = require("jsonwebtoken");
const Users = require("../Modules/users.module");

// Auth middleware - checks if user is logged in
const checkUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
// Exclude the password field from the result.
    const user = await Users.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - invalid token" });
  }
};

// Authorization middleware - only admins allowed
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      status: 403,
      success: false,
      message: "Access denied - admin only",
    });
  }
  next();
};

module.exports = { checkUser, requireAdmin };
