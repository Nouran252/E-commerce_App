

# 🛒 E-Commerce Backend API

A fully-featured e-commerce backend API built using **Node.js**, **Express**, and **MongoDB**. This project supports user authentication, product management, shopping cart, order processing, wishlists, reviews, and more — ideal for powering a modern online store.

---

## 🚀 Features

- **User Authentication** (Sign up, Sign in, Sign out)
- **Role-based Access** (Admin & Customer)
- **Product Management** (CRUD operations, filtering, and search)
- **Cart Management** (Add, remove, update items)
- **Order Processing** (Place orders, view history)
- **Wishlist** functionality
- **Product Reviews**
- **Email Notifications** via Nodemailer
- **Admin Controls**: Manage users, products, and orders
- **Secure Routes** with JWT authentication
- **Mongoose Models** for data structure
- **RESTful API** design

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT for Auth**
- **Nodemailer** (for email notifications)
- **Postman** (for API testing)
- **bcrypt** (password hashing)
- **dotenv** (environment config)

---

Create a `.env` file and add the following:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

Use [Postman]([https://www.postman.com/](https://www.postman.com/nouranmahmoud/e-commerce-app/collection/h5fj99q/e-commerce-api?action=share&creator=43120471)) to test the API endpoints.

---




## 📧 Email Notifications

Email notifications are sent upon successful order placement using **Nodemailer**. .

---

## 🔐 Security

- Passwords are hashed using **bcrypt**
- Routes protected with **JWT tokens**
- Admin-only access via middleware

---

## 🧠 Future Improvements

- WebSocket notifications for real-time updates
- Payment gateway integration
- Product recommendations

---

## 🙋‍♀️ Author

Contact: nouranmahmoud252@gmail.com
