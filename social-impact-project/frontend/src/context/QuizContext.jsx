import { createContext,  useState, useEffect } from "react";


export const QuizContext=createContext();

export const QuizProvider =({children})=>{
    const questions = [
        {
            id:1,
            type:"multiple-choice",
            question:"Which is renewable energy source?",
            options:["Coal","Solar","Petrol", "Diesel"],
            answer:"Solar",
            feedback:"solar energy is a clean and sustainable source."
        },
        {
            id:2,
            type:"true-false",
            question:"Planting trees helps reduce carbon dioxide",
            options:["True","False",],
            answer:"True",
            feedback:"Trees absorb C02 , playing a vital role in combating climate change."
        },
        
        {
            id:3,
            type:"multiple-choice",
            question:"Which practice saves water?",
            options:["Leaving taps open","Water harvesting","Flood irrigation", "None"],
            answer:"Water harvesting",
            
        },
        
        {
            id:4,
            type:"multiple-choice",
            question:"Which gas causes global warming?",
            options:["Oxygen","Carbon dioxide","Hydrogen", "Nitrogen"],
            answer:"Carbon dioxide",
            
        },
        {
            id:5,
            type:"multiple-choice",
            question:"Which sector contributes the most to deforestation?",
            options:["Transport","Agriculture","IT", "Education"],
            answer:"Agriculture",
           
        },
        
        {
            id:6,
            type:"multiple-choice",
            question:"What is composting?",
            options:["Burning waste","Burying plastic","Recycling organic matter", "Dumping chemicals"],
            answer:"Recycling organic matter",
            
        },
          {
            id:7,
            type:"true-false",
            question:"Plastic takes hundreds of years to decompose",
            options:["True","False"],
            answer:"True",
            
        },
          {
            id:8,
            type:"multiple-choice",
            question:"Which of these is a social enterprise?",
            options:["A traditional business","A non-profit organization","A business with a social mission", "A government agency"],
            answer:"A business with a social mission",
            
        },
          {
            id:9,
            type:"multiple-choice",
            question:"What is fair trade",
            options:["Unregulated trade","Exploitative labor practices","Equitable trading conditions for producers", "Trade without tariffs"],
            answer:"Equitable trading conditions for producers",
            
        },
          {
            id:10,
            type:"true-false",
            question:"Volunteering has no impact on society",
            options:["True", "False"],
            answer:"False",
            
        },
    
        
    ];


    const TIME_PER_QUESTION=15;

    const [currentIndex,setCurrentIndex] = useState(0);
    const[score,setScore] = useState(0);
    const[showResult , setShowResult] = useState(false);
    const[timer ,setTimer]=useState(TIME_PER_QUESTION);
    const[timerKey,setTimerKey] = useState(0);

  const startTimer = () => {
    setTimer(TIME_PER_QUESTION);
    setTimerKey(prevKey => prevKey +1);
  };

  useEffect(() => {
    let interval;
    if(!showResult){
        interval=setInterval(() => {
            setTimer((prevTimer) => {
                if(prevTimer <=1){
                    clearInterval(interval);

                    nextQuestion();

                    return TIME_PER_QUESTION;
                }

                return prevTimer - 1;
            });
        }, 1000);
    }

    return() => clearInterval(interval);
  },[currentIndex, showResult]);


  const nextQuestion = () => {
    if(currentIndex + 1 < questions.length){
        setCurrentIndex(currentIndex + 1);
        startTimer();
    } else {
        setShowResult(true);
    }
  };

  const resetQuiz= () =>{
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    startTimer();
  };

  useEffect(()=>{
    startTimer();
  }, []);

  const contextValue={
    questions,
    currentIndex,
    currentQ:questions[currentIndex],
    score,
    setScore,
    nextQuestion,
    showResult,
    resetQuiz,
    timer,
    timerKey
  };

  return (
    <QuizContext.Provider value={contextValue}>
        {children}
    </QuizContext.Provider>
  );

};
