import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quizRoutes.js";

const cors = require("cors");
app.use(cors({
  origin: ["https://learnplay.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

const app = express();
app.use(express.json());

app.use("/quiz", quizRoutes);

const PORT = process.env.PORT || 3001; 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
