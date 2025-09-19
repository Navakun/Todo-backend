import express from "express";
import pool from "../db.js";

const router = express.Router();

// Routes
router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  const [result] = await pool.query("INSERT INTO todos (title) VALUES (?)", [title]);
  res.status(201).json({ id: result.insertId, title, is_done: false });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { is_done } = req.body;
  await pool.query("UPDATE todos SET is_done = ? WHERE id = ?", [is_done, id]);
  res.json({ id, is_done });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id = ?", [id]);
  res.json({ message: "Deleted successfully" });
});

export default router;