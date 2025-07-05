import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {QuizProvider} from "./context/QuizContext";
import "./index.css";
import "./App.css";


ReactDOM.createRoot(document.getElementByID("root")).render(
  <React.StrictMode>
    <QuizProvider>
      <App/>
    
    </QuizProvider>
  
  </React.StrictMode>
);
