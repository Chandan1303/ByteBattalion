import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";

export default function Result() {
  const { score, questions, resetQuiz } = useContext(QuizContext);
  const percentage = (score / questions.length) * 100;

  const getMessage = () => {
    if (percentage === 100) {
      return "Fantastic! You're a social impact superstar! 🎉";
    } else if (percentage >= 70) {
      return "Great job! You have a strong understanding of social impact. 👏";
    } else if (percentage >= 40) {
      return "Good effort! Keep learning and making a difference. 💪";
    } else {
      return "Every step counts! Review the tips and try again. 🌱";
    }
  };

  return (
    <div className="result-container">
      <h2>🎉 Quiz Complete! 🎉</h2>
      <p>
        You scored {score} out of {questions.length} ({percentage.toFixed(0)}%)
      </p>
      <p className="result-message">{getMessage()}</p>
      <button onClick={resetQuiz}>Play Again</button>
      <button onClick={resetQuiz} style={{ marginLeft: "10px" }}>
        New Quiz
      </button>
    </div>
  );
}
