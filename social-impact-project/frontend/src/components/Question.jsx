import React , {useContext , useEffect , useState} from "react";
import {QuizContext} from"../context/QuizContext";

export default function Question(){
    const {currentQ , setScore, score , nextQuestion , timer , timerKey}= useContext(QuizContext);
    const [optionsDisabled , setOptionsDisabled]= useState(false);

    useEffect(()=> {
        setOptionsDisabled(false);
 }, [timerKey]);


    useEffect(()=>
    {
        if(timer ===0){
            setOptionsDisabled(true);
        }
    } , [timer]);

    const handleAnswer = (selected) =>{
        if(optionsDisabled) return;
    
         if(selected === currentQ.answer){
            setScore(score + 1);
        }


    nextQuestion();
};

if(!currentQ) return <div>Loading question...</div>;

return (
    <div className="question-card">
        <div className="timer-display" key={timerKey}>{ /*  */}
            Time Left: {timer}s
        </div>
        <h2>{currentQ.question}</h2>
        <div className="options-container">
            {currentQ.type === "multiple-choice" && 
             currentQ.options.map((option , idx) => (
                <button 
                key={idx}
                onClick={()=> handleAnswer(option)}
                disabled={optionsDisabled}
                >
                    {option}
                </button>
             ))
            }
   {currentQ.type === "true-false" && 
     currentQ.options.map((option , idx) => (
         <button 
                key={idx}
                onClick={()=> handleAnswer(option)}
                disabled={optionsDisabled}
                >
                    {option}
                </button>
       
         
         
     ))
   
   }


        </div>


    </div>
)


    
    
    

}
