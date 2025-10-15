import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Lista todas as perguntas ou filtra por categoria
router.get("/random", async (req, res) => {
  const count = parseInt(req.query.count || "10");
  const difficulty = req.query.difficulty;
  let query = supabase.from("quiz_questions").select("*");

  if (difficulty) query = query.eq("difficulty", difficulty);
  const { data, error } = await query;

  if (error) return res.status(400).json({ error: error.message });
  // embaralha e limita
  const shuffled = data.sort(() => Math.random() - 0.5).slice(0, count);
  res.json(shuffled);
});

export default router;
