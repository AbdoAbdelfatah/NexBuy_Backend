import express from "express";
import cors from "cors";
import userRoutes from "./routers/user.router.js";
import productRoutes from "./routers/product.router.js";
import commentRoutes from "./routers/comment.router.js";
import orderRoutes from "./routers/order.router.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:4200',
      'https://nexbuy-frontend.obl.ee'
    ].filter(Boolean); // Remove undefined values
    
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// global middlewares
app.use(cors(corsOptions));
app.use(express.json());

// register routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/comments", commentRoutes);
app.use("/orders", orderRoutes);

// global error handler (must be after routes)
app.use(errorHandler);

export default app;
