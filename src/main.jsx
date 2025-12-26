import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import "./styles/global.css";

// Импорт ТОЛЬКО чат-бота и уведомлений
import AIAssistant from "./components/AIAssistant.jsx";
import NotificationsToast from "./components/NotificationsToast.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
        <AIAssistant />
        <NotificationsToast />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);