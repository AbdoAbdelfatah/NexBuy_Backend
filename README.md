# 🛍️ NexBuy Backend API

A robust and scalable RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB. Features include user authentication, product management, shopping cart, order processing, and product reviews.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v8-green.svg)](https://www.mongodb.com/)


## ✨ Features

### Core Functionality
- 🔐 **JWT Authentication** - Secure user registration and login
- 👤 **User Management** - Profile management and authorization
- 📦 **Product CRUD** - Complete product lifecycle management with ownership control
- 🛒 **Shopping Cart** - Add, update, and remove cart items with quantity management
- 💳 **Order Processing** - Full checkout flow and order history
- ⭐ **Reviews & Ratings** - Product comments and star ratings
- 🔒 **Security** - Password hashing with bcrypt, input validation with Joi
- 🚀 **Performance** - Optimized database queries with Mongoose

## 🏗️ Architecture

Built following the **MVC pattern** with a clean separation of concerns:

```
├── config/         → Database and environment configuration
├── models/         → Mongoose schemas and data models
├── controllers/    → Request handlers and response logic
├── services/       → Business logic and data operations
├── middlewares/    → Authentication, validation, and error handling
├── routers/        → API route definitions
├── validations/    → Input validation schemas (Joi)
└── utils/          → Helper functions (JWT, hashing, email)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher) or MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbdoAbdelfatah/nexbuy-backend.git
   cd nexbuy-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/nexbuy
   
   # Authentication
   JWT_SECRET=your_secure_random_secret_key_here
   JWT_EXPIRE=7d
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # CORS
   FRONTEND_URL=http://localhost:4200
   
   # Email (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the server**
   ```bash
   # Development mode with hot reload
   npm run dev
   
   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/register` | Register new user | No |
| POST | `/users/login` | Login user | No |
| GET | `/users/me` | Get current user profile | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get product by ID | No |
| POST | `/products` | Create new product | Yes |
| PUT | `/products/:id` | Update product | Yes (Owner) |
| DELETE | `/products/:id` | Delete product | Yes (Owner) |

### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/cart/add` | Add item to cart | Yes |
| POST | `/users/cart/remove` | Remove/decrease item quantity | Yes |

### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/orders` | Create new order | Yes |
| GET | `/orders` | Get user's orders | Yes |
| GET | `/orders/:id` | Get specific order | Yes |

### Comment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/comments` | Add product review | Yes |
| GET | `/comments/:productId` | Get product comments | No |

### Request/Response Examples

#### Register User
```bash
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "age": 25,
  "gender": "male"
}
```

#### Create Product
```bash
POST /products
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Wireless Headphones",
  "desc": "Premium noise-cancelling headphones",
  "price": 199.99,
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Product image"
    }
  ],
  "specs": {
    "brand": "TechBrand",
    "color": "Black",
    "warranty": "2 years"
  }
}
```

## 🔐 Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Token is returned upon successful login/registration and expires after 7 days.

## 🗃️ Database Schema

### User Model
- name, email, password (hashed)
- age, gender
- cart (array of products with quantities)
- timestamps

### Product Model
- title, description, price
- images (array), specifications (object)
- createdBy (reference to User)
- timestamps

### Order Model
- user (reference)
- products (array with quantities)
- totalAmount
- shippingAddress
- status
- timestamps

### Comment Model
- user (reference)
- product (reference)
- content, rating (1-5)
- timestamps

## 🛡️ Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication with expiration
- **Input Validation**: Joi schemas for all inputs
- **CORS Protection**: Configurable allowed origins
- **Error Handling**: Centralized error middleware
- **Ownership Verification**: Users can only modify their own resources

## 🧪 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **Bcrypt** | Password hashing |
| **Joi** | Input validation |
| **Nodemailer** | Email notifications |
| **CORS** | Cross-origin resource sharing |
| **Dotenv** | Environment variables |

## 📦 Project Structure

```
nexbuy-backend/
├── src/
│   ├── config/
│   │   └── db.config.js           # Database connection
│   ├── models/
│   │   ├── user.model.js          # User schema
│   │   ├── product.model.js       # Product schema
│   │   ├── order.model.js         # Order schema
│   │   └── comment.model.js       # Comment schema
│   ├── controllers/
│   │   ├── user.controller.js     # User endpoints
│   │   ├── product.controller.js  # Product endpoints
│   │   ├── order.controller.js    # Order endpoints
│   │   └── comment.controller.js  # Comment endpoints
│   ├── services/
│   │   ├── user.service.js        # User business logic
│   │   ├── product.service.js     # Product business logic
│   │   ├── order.service.js       # Order business logic
│   │   └── comment.service.js     # Comment business logic
│   ├── middlewares/
│   │   ├── auth.middleware.js     # JWT verification
│   │   ├── validation.middleware.js # Input validation
│   │   └── error.middleware.js    # Error handling
│   ├── routers/
│   │   ├── user.router.js         # User routes
│   │   ├── product.router.js      # Product routes
│   │   ├── order.router.js        # Order routes
│   │   └── comment.router.js      # Comment routes
│   ├── validations/
│   │   ├── user.validation.js     # User schemas
│   │   ├── product.validation.js  # Product schemas
│   │   ├── order.validation.js    # Order schemas
│   │   └── comment.validation.js  # Comment schemas
│   ├── utils/
│   │   ├── jwt.js                 # JWT helpers
│   │   ├── hash.js                # Hashing helpers
│   │   └── mail.js                # Email helpers
│   ├── app.js                     # Express app setup
│   └── server.js                  # Entry point
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 👨‍� Authors

**Abdo Abdelfatah**

- GitHub: [@AbdoAbdelfatah](https://github.com/AbdoAbdelfatah)

**Bahaa Zenhom**

- GitHub: [@bahaazenhom](https://github.com/bahaazenhom)

## 🔗 Related

- [Frontend Repository](https://github.com/bahaazenhom/NexBuy-Frontend) - Angular frontend application

