import React,{useContext} from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Tips from"./components/Tips";
import {QuizContext} from "./context/QuizContext";


export default function App(){
  const {showResult} = useContext(QuizContext);

  return (
    <div className="app-container">
      <h1 className="title">🌟 GreenQuiz 🌟</h1>
      {!showResult && <Tips/>}
      {showResult ? <Result/> : <Quiz /> }
    
    </div>
    );
}
