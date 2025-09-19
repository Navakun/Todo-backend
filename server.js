import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todos.js";
import pool from "./db.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/todos", todoRoutes);
app.get("/todos", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  res.json(rows);
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
