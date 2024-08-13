import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
  SameSite: "None",
  withCredentials: true,
  allowedHeaders: "Content-Type,Authorization",
  exposedHeaders: "Content-Range, X-Content- Range",
  methods: "GET, POST, PUT ,DELETE",
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.listen(8000, () => {
  console.log("Server running on localhost:8000");
});
