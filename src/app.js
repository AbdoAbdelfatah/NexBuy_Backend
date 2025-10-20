import express from "express";
import userRoutes from "./routers/user.router.js";
import productRoutes from "./routers/product.router.js";
import commentRoutes from "./routers/comment.router.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

// global middlewares
app.use(express.json()); // parse JSON bodies

// register routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/comments", commentRoutes); 

// global error handler (must be after routes)
app.use(errorHandler);

export default app;
