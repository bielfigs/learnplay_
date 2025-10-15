import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/quiz", quizRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3001}`);
});
