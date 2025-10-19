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
