// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import Sidebar from './components/sidebar/Sidebar'; // Adjust according to your file structure

// Lazy load the components to improve initial load time
const Home = lazy(() => import('./pages/Home'));
const UploadFile = lazy(() => import('./pages/UploadFile'));
const ViewFiles = lazy(() => import('./pages/ViewFiles'));

// Initialize Fluent UI icons once at the top level


function App() {
  return (
    <Router>
        <div className="flex">
          <Sidebar />
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <div className="flex flex-col mt-5">
                <Routes>
                  <Route path="/upload" element={<UploadFile />} />
                  <Route path="/files" element={<ViewFiles />} />
                  <Route path="/" element={<Home />} />
                </Routes>
              </div>
            </Suspense>
          </ErrorBoundary>
        </div>
    </Router>
  );
}

export default App;
