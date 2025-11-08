import { useEffect, useMemo, useState } from "react";

/**
 * Gera um desafio do tipo: A ∎ B = R
 * Escolhe um operador válido e garante que a expressão seja verdadeira.
 * Retorna: { a, b, op, result, options }
 */
function makePuzzle() {
  const ops = ["+", "-", "*", "/"];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let a, b, result;

  if (op === "/") {
    // Garante divisão exata e evita zero
    b = Math.floor(Math.random() * 9) + 1; // 1..10
    const r = Math.floor(Math.random() * 10) + 1; // 1..10
    a = b * r;
    result = r;
  } else if (op === "*") {
    a = Math.floor(Math.random() * 10) + 1; // 1..10
    b = Math.floor(Math.random() * 10) + 1; // 1..10
    result = a * b;
  } else if (op === "+") {
    a = Math.floor(Math.random() * 30) + 1; // 1..30
    b = Math.floor(Math.random() * 30) + 1; // 1..30
    result = a + b;
  } else {
    // "-"
    a = Math.floor(Math.random() * 30) + 10; // 10..39
    b = Math.floor(Math.random() * 30) + 1;  // 1..30
    if (b > a) [a, b] = [b, a]; // evita negativo
    result = a - b;
  }

  // Monta opções com o operador correto e 3 distrações
  const symbols = ["+", "-", "*", "/"];
  const distractors = symbols.filter((s) => s !== op);
  // Embaralha e pega 2–3 distratores
  for (let i = distractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  const options = [op, ...distractors.slice(0, 3)];

  // Embaralha opções finais
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return { a, b, op, result, options };
}

const OP_EMOJI = { "+": "➕", "-": "➖", "*": "✖️", "/": "➗" };

export default function LogicScreen({ showScreen }) {
  const [puzzle, setPuzzle] = useState(makePuzzle());
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [chosen, setChosen] = useState(null);

  // Mostra o modelo pedido no chat: 20 ∎ 10 = 30
  // Dica inicial (opcional, aparece só na primeira montagem)
  const demo = useMemo(() => ({ a: 20, b: 10, result: 30 }), []);

  useEffect(() => {
    setFeedback("");
    setChosen(null);
  }, [puzzle]);

  function pick(op) {
    setChosen(op);
    if (op === puzzle.op) {
      setFeedback("Acertou! 🎉");
      setCorrect((c) => c + 1);
    } else {
      setFeedback(`Ops! O correto era ${OP_EMOJI[puzzle.op]} (${puzzle.op}). 💡`);
      setWrong((w) => w + 1);
    }
  }

  function next() {
    setPuzzle(makePuzzle());
  }

  return (
    <div className="screen active">
      <div className="math-container">
        <button className="back-button" onClick={() => showScreen("home")}>
          ← Voltar
        </button>

        {/* Dica inicial com o exemplo do usuário */}
        <div className="question-card" style={{ marginBottom: 20 }}>
          <div className="question" style={{ fontSize: "1.4em" }}>
            Exemplo: {demo.a} ∎ {demo.b} = {demo.result} &nbsp;
            <span style={{ fontSize: "0.7em", color: "#666" }}>
              (Resposta: {OP_EMOJI["+"]})
            </span>
          </div>
        </div>

        {/* Desafio atual */}
        <div className="question-card">
          <div className="question" style={{ marginBottom: 10 }}>
            {puzzle.a} ∎ {puzzle.b} = {puzzle.result}
          </div>

          <div className="operation-selector" style={{ marginTop: 10 }}>
            {puzzle.options.map((op) => (
              <button
                key={op}
                className={`operation-btn ${chosen === op ? "active" : ""}`}
                onClick={() => pick(op)}
                aria-label={`Escolher operador ${op}`}
              >
                {OP_EMOJI[op]}
              </button>
            ))}
          </div>

          <div
            className={`feedback ${
              feedback.startsWith("Acertou") ? "correct" : feedback.startsWith("Ops!") ? "incorrect" : ""
            }`}
            style={{ marginTop: 20 }}
          >
            {feedback}
          </div>

          <button className="submit-btn next-btn" onClick={next} style={{ marginTop: 20 }}>
            Próximo desafio
          </button>
        </div>

        {/* Placar reaproveita seu visual */}
        <div className="score-board">
          <div className="score-item correct">
            <div className="score-label">Acertos</div>
            <div className="score-value">{correct}</div>
          </div>
          <div className="score-item incorrect">
            <div className="score-label">Erros</div>
            <div className="score-value">{wrong}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
