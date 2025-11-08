import React, { useState } from "react";
import Header from "./components/Header";
import HomeScreen from "./components/HomeScreen";
import MathScreen from "./components/MathScreen";
import LogicScreen from "./components/LogicScreen";
import QuizScreen from "./components/QuizScreen"; // 👈 novo import
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <div>
      <Header />

      {screen === "home" && <HomeScreen showScreen={setScreen} />}
      {screen === "math" && <MathScreen showScreen={setScreen} />}
      {screen === "logic" && <LogicScreen showScreen={setScreen} />}
      {screen === "quiz" && <QuizScreen showScreen={setScreen} />} {/* 👈 novo */}
    </div>
  );
}
