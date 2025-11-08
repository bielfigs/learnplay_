export default function HomeScreen({ showScreen }) {
  return (
    <div id="homeScreen" className="screen active">
      <div className="home-container">
        <div className="welcome-card">
          <div className="welcome-content">
            <h2>Bem-vindo ao Quiz Matemático!</h2>
            <p>Escolha uma atividade abaixo e comece a aprender brincando!</p>
          </div>
          <div className="welcome-decoration">
            <div className="lightbulb"></div>
            <div className="star"></div>
            <div className="character-placeholder"></div>
          </div>
        </div>
      </div>

      <div className="activities-grid">
        <div className="activity-card math" onClick={() => showScreen("math")}>
          <span className="activity-icon">➕</span>
          <h3>Questões Matemáticas</h3>
          <p>Pratique soma, subtração, multiplicação e divisão!</p>
        </div>

        <div className="activity-card logic" onClick={() => showScreen("logic")}>
          <span className="activity-icon">🧩</span>
          <h3>Raciocínio Lógico</h3>
          <p>Desafie sua mente com quebra-cabeças!</p>
        </div>

        <div className="activity-card quiz" onClick={() => showScreen("quiz")}>
          <span className="activity-icon">❓</span>
          <h3>Quiz Divertido</h3>
          <p>Teste seus conhecimentos de forma divertida!</p>
        </div>
      </div>
    </div>
  );
}
