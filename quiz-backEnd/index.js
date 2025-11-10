import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

// ✅ Libera completamente o CORS para todas as origens
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // permite qualquer origem
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(cors()); // middleware extra de segurança (com suporte a headers automáticos)
app.use(express.json());

// ✅ Rota de teste (para verificar se o servidor está ativo)
app.get("/", (req, res) => {
  res.json({ message: "Servidor LearnPlay ativo e CORS liberado ✅" });
});

// ✅ Rotas principais
app.use("/quiz", quizRoutes);

// ✅ Porta dinâmica exigida pelo Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
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
