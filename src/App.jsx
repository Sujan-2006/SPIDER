import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';

import NavigationBar from './components/NavigationBar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="spider-app-root h-screen w-full flex flex-col overflow-hidden bg-[#FAF9F7]">
        <NavigationBar />
        <div className="flex-1 w-full h-full overflow-hidden flex flex-col relative focus:outline-none">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/preview" element={<PreviewPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
