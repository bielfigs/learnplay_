import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://learnplay-drat3xc7s-santosgabrielfigueiredodos-4989s-projects.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use("/quiz", quizRoutes);

const PORT = process.env.PORT || 3001; 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
