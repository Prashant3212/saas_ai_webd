import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ImageGenerator from './pages/tools/ImageGenerator';
import BackgroundRemover from './pages/tools/BackgroundRemover';
import ResumeAnalyzer from './pages/tools/ResumeAnalyzer';
import BlogGenerator from './pages/tools/BlogGenerator';
import Community from './pages/Community';
import Pricing from './pages/Pricing';


function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tools/image-generator" element={<ImageGenerator />} />
            <Route path="/tools/background-remover" element={<BackgroundRemover />} />
            <Route path="/tools/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/tools/blog-generator" element={<BlogGenerator />} />
            <Route path="/community" element={<Community />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </AnimatePresence>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;


