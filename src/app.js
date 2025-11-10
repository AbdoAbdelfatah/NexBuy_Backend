import express from "express";
import cors from "cors";
import userRoutes from "./routers/user.router.js";
import productRoutes from "./routers/product.router.js";
import commentRoutes from "./routers/comment.router.js";
import orderRoutes from "./routers/order.router.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// global middlewares - Allow all origins for now
app.use(cors());
app.use(express.json());

// register routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/comments", commentRoutes);
app.use("/orders", orderRoutes);

// global error handler (must be after routes)
app.use(errorHandler);

export default app;
