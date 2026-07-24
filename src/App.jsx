import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import TemplatesPage from './pages/TemplatesPage';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

import NavigationBar from './components/NavigationBar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="spider-app-root h-screen w-full flex flex-col overflow-hidden bg-[#FAF9F7]">
        <NavigationBar />
        <div className="flex-1 w-full h-full overflow-hidden flex flex-col relative focus:outline-none">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage defaultLogin={false} />} />
            <Route path="/login" element={<SignUpPage defaultLogin={true} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/builder/:projectId" element={<BuilderPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
