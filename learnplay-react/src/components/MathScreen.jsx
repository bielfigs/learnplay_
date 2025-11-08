import { useState, useEffect } from "react";

export default function MathScreen({ showScreen }) {
  const [operation, setOperation] = useState("+");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line
  }, [operation]);

  const generateQuestion = () => {
    let a, b, correct;
    if (operation === "/") {
      b = Math.floor(Math.random() * 9) + 1;
      correct = Math.floor(Math.random() * 10) + 1;
      a = b * correct;
    } else {
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
      switch (operation) {
        case "+":
          correct = a + b;
          break;
        case "-":
          if (a < b) [a, b] = [b, a];
          correct = a - b;
          break;
        case "*":
          a = Math.floor(Math.random() * 10) + 1;
          b = Math.floor(Math.random() * 10) + 1;
          correct = a * b;
          break;
        default:
          correct = 0;
      }
    }
    setNum1(a);
    setNum2(b);
    setCorrectAnswer(correct);
    setAnswer("");
    setFeedback("");
  };

  const checkAnswer = () => {
    const val = parseInt(answer);
    if (isNaN(val)) {
      setFeedback("Por favor, digite um número!");
      return;
    }

    if (val === correctAnswer) {
      setFeedback("Parabéns! Resposta correta! 🎉");
      setCorrectCount((c) => c + 1);
    } else {
      setFeedback(`Ops! A resposta correta é ${correctAnswer}. Tente novamente! 💪`);
      setIncorrectCount((c) => c + 1);
    }
  };

  return (
    <div className="screen active">
      <div className="math-container">
        <button className="back-button" onClick={() => showScreen("home")}>
          ← Voltar
        </button>

        <div className="operation-selector">
          {["+", "-", "*", "/"].map((op) => (
            <button
              key={op}
              className={`operation-btn ${operation === op ? "active" : ""}`}
              onClick={() => setOperation(op)}
            >
              {op === "+" ? "➕" : op === "-" ? "➖" : op === "*" ? "✖️" : "➗"}
            </button>
          ))}
        </div>

        <div className="question-card">
          <div className="question">
            {num1}{" "}
            {operation === "+"
              ? "➕"
              : operation === "-"
              ? "➖"
              : operation === "*"
              ? "✖️"
              : "➗"}{" "}
            {num2} = ?
          </div>

          <input
            type="number"
            className="answer-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            placeholder="?"
          />

          <br />
          <button className="submit-btn" onClick={checkAnswer}>
            Verificar
          </button>
          <button className="submit-btn next-btn" onClick={generateQuestion}>
            Próxima
          </button>

          <div className={`feedback ${feedback.includes("correta") ? "correct" : feedback.includes("Ops") ? "incorrect" : ""}`}>
            {feedback}
          </div>
        </div>

        <div className="score-board">
          <div className="score-item correct">
            <div className="score-label">Acertos</div>
            <div className="score-value">{correctCount}</div>
          </div>
          <div className="score-item incorrect">
            <div className="score-label">Erros</div>
            <div className="score-value">{incorrectCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
