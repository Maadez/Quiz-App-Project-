import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import { QuestionsProvider } from "./context/QuestionsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuestionsProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </QuestionsProvider>
  </React.StrictMode>,
);
