import React from "react";
import ReactDom from "react-dom/client" ;
import App from "./App";
import {QuizProvider} from "./context/QuizContext";
import "./index.css";
import"./App.css";


ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizProvider>
      <App/>
    </QuizProvider>
  </React.StrictMode>
);
