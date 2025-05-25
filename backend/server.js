import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookRoutes from "./routers/bookRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/books", bookRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log(PORT);
});
