import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
// Admin Routes
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
