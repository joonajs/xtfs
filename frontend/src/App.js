// src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import ErrorBoundary from "./components/ErrorBoundary"; // Assume this is a custom component
import Loading from "./components/Loading"; // Assume this is a custom component

// Lazy load the components to improve initial load time
const Home = lazy(() => import("./pages/Home"));
const UploadFile = lazy(() => import("./pages/UploadFile"));
const ViewFiles = lazy(() => import("./pages/ViewFiles"));
const Sidebar = lazy(() => import("./components/sidebar/Sidebar"));

// Initialize Fluent UI icons once at the top level
initializeIcons();

function App() {
  return (
    <Router>
      <FluentProvider theme={teamsLightTheme}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <div className="flex mt-5">
              <Routes>
                <Route path="/upload" element={<UploadFile />} />
                <Route path="/files" element={<ViewFiles />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </Suspense>
        </ErrorBoundary>
      </FluentProvider>
    </Router>
  );
}

export default App;
