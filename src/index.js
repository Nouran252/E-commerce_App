const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const cookie_parser = require("cookie-parser");
const { connectDB } = require("./DB/ConnectDB.js");
const { checkUser } = require("./middlewares/auth.middleware.js");
const app = express();

// Middlewares
app.use(express.json());
app.use(cookie_parser());


//Routes
app.use("/api/auth", require("./Routers/auth.routes"));
// Middleware to protect all routes after this line
app.use("*",checkUser);
app.use("/api/users", require("./Routers/user.routes"));
app.use("/api/products", require("./Routers/product.routes"));
app.use("/api/cart", require("./Routers/cart.routes"));
app.use("/api/orders", require("./Routers/order.routes"));
app.use("/api/reviews", require("./Routers/review.routes"));
app.use("/api/wishlist", require("./Routers/wishlist.routes"));



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});