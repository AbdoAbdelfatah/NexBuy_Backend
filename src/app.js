import express from "express";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import orderRoutes from "./routes/order.routes.js";
import errorHandler from "./middlewares/error.middleware";

const app = express();

// global middlewares
app.use(express.json()); // parse JSON bodies

// register routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/comments", commentRoutes);
app.use("/orders", orderRoutes);

// global error handler (must be after routes)
app.use(errorHandler);

export default app;
