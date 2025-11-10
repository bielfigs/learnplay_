import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

// ✅ Middleware global para CORS manual
app.use((req, res, next) => {
  // 🟢 Permite todas as origens (universal)
  res.header("Access-Control-Allow-Origin", "*");

  // 🟡 Se quiser permitir apenas o front hospedado na Vercel, use:
  // res.header("Access-Control-Allow-Origin", "https://learnplay.vercel.app");

  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Intercepta requisições OPTIONS (pré-flight)
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ✅ Middleware express padrão
app.use(express.json());

// ✅ Rotas principais
app.get("/", (req, res) => {
  res.json({ message: "Servidor LearnPlay rodando ✅" });
});

app.use("/quiz", quizRoutes);

// ✅ Porta dinâmica do Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
