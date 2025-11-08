import { useState, useEffect } from "react";

export default function QuizScreen({ showScreen }) {
  const [difficulty, setDifficulty] = useState(null); // 👈 seleção do nível
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [loading, setLoading] = useState(false);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (!difficulty) return;

    setLoading(true);
    fetch(`http://localhost:3001/quiz/random?count=10&difficulty=${difficulty}`)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = shuffle(data).map((q) => {
          const opts = shuffle([
            { label: "A", text: q.option_a },
            { label: "B", text: q.option_b },
            { label: "C", text: q.option_c },
            { label: "D", text: q.option_d },
          ]);
          return { ...q, options: opts };
        });
        setQuestions(shuffled);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [difficulty]);

  if (!difficulty)
    return (
      <div className="screen active">
        <div className="math-container" style={{ textAlign: "center" }}>
          <button className="back-button" onClick={() => showScreen("home")}>
            ← Voltar
          </button>
          <h2>Escolha a dificuldade</h2>
          <div className="operation-selector">
            <button className="operation-btn" onClick={() => setDifficulty("facil")}>😄 Fácil</button>
            <button className="operation-btn" onClick={() => setDifficulty("medio")}>🤓 Médio</button>
            <button className="operation-btn" onClick={() => setDifficulty("dificil")}>🧠 Difícil</button>
          </div>
        </div>
      </div>
    );

  if (loading) return <p>Carregando perguntas...</p>;
  if (questions.length === 0)
    return (
      <div className="screen active">
        <div className="math-container" style={{ textAlign: "center" }}>
          <p>Sem perguntas disponíveis para esta dificuldade.</p>
          <button className="back-button" onClick={() => setDifficulty(null)}>← Escolher outra</button>
        </div>
      </div>
    );

  const q = questions[current];

  function choose(label) {
    if (selected) return;
    setSelected(label);
    const correctLabel = q.correct_option;
    if (label === correctLabel) {
      setFeedback("🎉 Acertou!");
      setCorrect((c) => c + 1);
    } else {
      setFeedback(`❌ Errado! Resposta: ${correctLabel}`);
      setWrong((w) => w + 1);
    }
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setFeedback("");
    } else {
      setFeedback("🏁 Fim do quiz!");
    }
  }

  return (
    <div className="screen active">
      <div className="math-container">
        <button className="back-button" onClick={() => showScreen("home")}>
          ← Voltar
        </button>

        <div className="question-card">
          <div className="question">
            ({current + 1}/{questions.length}) {q.question}
          </div>

          <div className="operation-selector">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                className={`operation-btn ${
                  selected === opt.label
                    ? opt.label === q.correct_option
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => choose(opt.label)}
              >
                {opt.label}) {opt.text}
              </button>
            ))}
          </div>

          <div
            className={`feedback ${
              feedback.startsWith("🎉")
                ? "correct"
                : feedback.startsWith("❌")
                ? "incorrect"
                : ""
            }`}
            style={{ marginTop: 20 }}
          >
            {feedback}
          </div>

          {feedback && feedback !== "🏁 Fim do quiz!" && (
            <button className="submit-btn next-btn" onClick={nextQuestion}>
              Próxima
            </button>
          )}
        </div>

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
