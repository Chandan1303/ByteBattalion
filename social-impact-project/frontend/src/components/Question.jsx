import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext"; // Corrected import: named import with curly braces

export default function Question() {
  const { currentQ, setScore, score, nextQuestion } = useContext(QuizContext);

  const handleAnswer = (selected) => {
    if (selected === currentQ.answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  if (!currentQ) return <div>Loading question...</div>;

  return (
    <div className="question-card">
      <h2>{currentQ.question}</h2>
      <div className="options-container">
        {currentQ.type === "multiple-choice" &&
          currentQ.options.map((option, idx) => (
            <button key={idx} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        {currentQ.type === "true-false" &&
          currentQ.options.map((option, idx) => (
            <button key={idx} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
      </div>
    </div>
  );
}