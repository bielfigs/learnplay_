import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

// ✅ Middleware de CORS duplo (manual + lib)
const allowedOrigins = [
  "https://learnplay.vercel.app",
  "https://learnplay-drat3xc7s-santosgabrielfigueiredodos-4989s-projects.vercel.app",
  ];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.header("Access-Control-Allow-Origin", "*"); // fallback
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// ✅ Rota base para testar se o servidor está ativo
app.get("/", (req, res) => {
  res.json({ message: "Servidor LearnPlay ativo ✅" });
});

// ✅ Rotas
app.use("/quiz", quizRoutes);

// ✅ Porta dinâmica do Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

