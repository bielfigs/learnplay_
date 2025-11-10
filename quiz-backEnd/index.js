import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "https://learnplay.vercel.app",
    "https://learnplay-drat3xc7s-santosgabrielfigueiredodos-4989s-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.use("/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.send("Servidor LearnPlay ativo ✅");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
