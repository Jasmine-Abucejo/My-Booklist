import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { connectDB } from "./config/db.js";
import bookRoutes from "./routers/bookRoutes.js";

dotenv.config();
const app = express();
// app.use(
//   cors({
//     origin: "https://my-booklist-tawny.vercel.app",
//   })
// );
app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

app.listen(PORT, () => {
  connectDB();
  console.log(PORT);
});
