import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import BuilderPage from './pages/BuilderPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="spider-app-root h-screen w-full overflow-hidden bg-[#FAF9F7]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder/:id?" element={<BuilderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
