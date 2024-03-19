import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FluentProvider, teamsDarkTheme, teamsLightTheme } from "@fluentui/react-components";
import { ThemeProvider, useTheme } from "./components/ThemeContext";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

// Create a new component that applies the theme
function ThemedApp() {
  const { isDark } = useTheme(); // Use the theme hook inside the component

  // Select the theme based on the dark mode state
  const themeSelect = isDark ? teamsDarkTheme : teamsLightTheme;

  initializeIcons(); // Initialize Fluent UI icons
  return (
    <FluentProvider theme={themeSelect} className="flex">
      <App />
    </FluentProvider>
  );
}

// Get the root of the app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render your app within the ThemeProvider
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ThemedApp /> {/* Use ThemedApp here */}
    </ThemeProvider>
  </React.StrictMode>
);

// Performance measuring remains unchanged
reportWebVitals();
