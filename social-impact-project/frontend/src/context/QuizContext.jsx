import { createContext, useState, useEffect } from "react"; // Import useEffect

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const questions = [
    {
      id: 1,
      type: "multiple-choice",
      question: "Which is a renewable energy source?",
      options: ["Coal", "Solar", "Petrol", "Diesel"],
      answer: "Solar",
      feedback: "Solar energy is a clean and sustainable source."
    },
    {
      id: 2,
      type: "true-false",
      question: "Planting trees helps reduce carbon dioxide.",
      options: ["True", "False"],
      answer: "True",
      feedback: "Trees absorb CO2, playing a vital role in combating climate change."
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "Which practice saves water?",
      options: ["Leaving taps open", "Water harvesting", "Flood irrigation", "None"],
      answer: "Water harvesting"
    },
    {
      id: 4,
      type: "multiple-choice",
      question: "Which gas causes global warming?",
      options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
      answer: "Carbon dioxide"
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "Which sector contributes the most to deforestation?",
      options: ["Transport", "Agriculture", "IT", "Education"],
      answer: "Agriculture"
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "What is composting?",
      options: ["Burning waste", "Burying plastic", "Recycling organic matter", "Dumping chemicals"],
      answer: "Recycling organic matter"
    },
    {
      id: 7,
      type: "true-false",
      question: "Plastic takes hundreds of years to decompose.",
      options: ["True", "False"],
      answer: "True"
    },
    {
      id: 8,
      type: "multiple-choice",
      question: "Which of these is a social enterprise?",
      options: ["A traditional business", "A non-profit organization", "A business with a social mission", "A government agency"],
      answer: "A business with a social mission"
    },
    {
      id: 9,
      type: "multiple-choice",
      question: "What is fair trade?",
      options: ["Unregulated trade", "Exploitative labor practices", "Equitable trading conditions for producers", "Trade without tariffs"],
      answer: "Equitable trading conditions for producers"
    },
    {
      id: 10,
      type: "true-false",
      question: "Volunteering has no impact on society.",
      options: ["True", "False"],
      answer: "False"
    }
  ];

  const TIME_PER_QUESTION = 15; // Set time in seconds per question

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(TIME_PER_QUESTION); // New state for timer
  const [timerKey, setTimerKey] = useState(0); // New state to reset timer component

  // Function to start the timer countdown
  const startTimer = () => {
    setTimer(TIME_PER_QUESTION);
    setTimerKey(prevKey => prevKey + 1); // Increment key to force timer re-render
  };

  // Effect to manage the countdown
  useEffect(() => {
    let interval;
    if (!showResult) { // Only run timer if quiz is active
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            // If timer runs out, move to next question (or show result if last)
            nextQuestion();
            return TIME_PER_QUESTION; // Reset for next question
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup on component unmount or state change
  }, [currentIndex, showResult]); // Re-run effect when current question changes or result is shown

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      startTimer(); // Start timer for the next question
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    startTimer(); // Start timer when quiz is reset
  };

  // Initial timer start when component mounts
  useEffect(() => {
    startTimer();
  }, []); // Run only once on mount

  const contextValue = {
    questions,
    currentIndex,
    currentQ: questions[currentIndex],
    score,
    setScore,
    nextQuestion,
    showResult,
    resetQuiz,
    timer, // Expose timer state
    timerKey // Expose timerKey
  };

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};