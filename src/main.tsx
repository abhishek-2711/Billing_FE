import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n"; // Import the i18n configuration

// Theme initialization
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    // Apply the saved theme
    document.documentElement.classList.add(savedTheme);
  } else {
    // Default to system preference if no saved theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
    localStorage.setItem("theme", prefersDark ? "dark" : "light");
  }
};

initializeTheme(); // Call the function before rendering the app

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
