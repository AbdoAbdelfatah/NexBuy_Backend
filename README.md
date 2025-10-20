project-name/
│
├── src/
│ ├── config/ # Configuration (DB connection, environment)
│ │ └── db.config.js
│ │
│ ├── models/ # Mongoose schemas/models
│ │ ├── user.model.js
│ │ ├── product.model.js
│ │ └── comment.model.js
│ │
│ ├── controllers/ # Handles HTTP requests/responses
│ │ ├── user.controller.js
│ │ ├── product.controller.js
│ │ └── comment.controller.js
│ │
│ ├── services/ # Business logic (called by controllers)
│ │ ├── user.service.js
│ │ ├── product.service.js
│ │ └── comment.service.js
│ │
│ ├── routes/ # Route definitions
│ │ ├── user.routes.js
│ │ ├── product.routes.js
│ │ └── comment.routes.js
│ │
│ ├── middlewares/ # Reusable middleware (auth, validation, etc.)
│ │ ├── auth.middleware.js
│ │ └── error.middleware.js
│ │
│ ├── validators/ # Joi validation schemas
│ │ ├── user.validator.js
│ │ └── product.validator.js
│ │
│ ├── utils/ # Helper functions (tokens, hashing, etc.)
│ │ ├── jwt.js
│ │ └── hash.js
│ │
│ ├── app.js # Express app setup
│ └── server.js # App entry point
│
├── .env # Environment variables
├── .gitignore
├── package.json
└── README.md

Notes:
The controller = handles input/output and decisions
The service = handles data and business logic (database only)

## Features

- Users (register/login) with JWT auth
- Products CRUD (create/list/get/delete)
- User cart: add/remove items
- Comments: add a comment + rating for products
- Nodemailer helper for sending emails (welcome/order)
- JWT & bcrypt security for auth

## API

POST /users/register { name, email, password, age, gender }
POST /users/login { email, password } -> returns token
GET /users/me (auth)
POST /users/cart/add { productId, quantity } (auth)
POST /users/cart/remove { productId, removeAll } (auth)

POST /products (auth) create product
GET /products list
GET /products/:id
DELETE /products/:id (owner only)

POST /comments { productId, content, rate } (auth)
GET /comments/:productId
