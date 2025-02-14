import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

//files
import connectDB from "./config/db.js";
import userRoutes from "./user/userRoutes.js";
import genreRoutes from "./genre/genreRoutes.js";
import movieRoutes from "./movie/movieRoutes.js";
import uploadRoutes from "./movie/uploadRoutes.js";
import uploadImage from "./uploadImage/uploadRoute.js";
import paymentRoutes from "./razorpay/razorpayRoutes.js";

//configuration
dotenv.config();
connectDB();

const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/upload-image", uploadImage);
app.use("/api/v1/payment", paymentRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
