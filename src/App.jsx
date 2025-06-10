// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './pages/HomeComponent.jsx';
import Unit3 from './pages/Unit3Component.jsx';
import Unit4 from './pages/Unit4Component.jsx';
import AssessmentPrep from './pages/AssessmentPrepComponent.jsx';
import Glossary from './pages/GlossaryComponent.jsx';
import Unit3SAC2Prep from './components/Unit3SAC2PrepComponent.jsx';
import Unit3Quiz from './pages/Unit3QuizComponent.jsx';
import Unit3Flashcards from './pages/Unit3FlashcardsComponent.jsx';
import Unit3PracticeQuestions from './pages/Unit3PracticeQuestionsComponent.jsx';
import KeySkillsHub from './pages/key-skills-hub.jsx';
import NotFound from './pages/NotFoundComponent.jsx';

import './App.css';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return visible ? (
    <button onClick={scrollTop} className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white font-bold p-3 rounded-full shadow-lg z-40">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  ) : null;
}

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <div className="bg-slate-900 text-slate-200 font-sans antialiased">
        <header className="bg-slate-800 shadow-lg sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300">HHD Hub</Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-200 hover:text-purple-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
            <ul className="hidden md:flex space-x-4">
              <li><Link to="/" className="nav-link hover:text-purple-300 px-3 py-2 rounded-md">Home</Link></li>
              <li><Link to="/unit3" className="nav-link hover:text-purple-300 px-3 py-2 rounded-md">Unit 3</Link></li>
              <li><Link to="/unit4" className="nav-link hover:text-purple-300 px-3 py-2 rounded-md">Unit 4</Link></li>
              <li><Link to="/assessment-prep" className="nav-link hover:text-purple-300 px-3 py-2 rounded-md">Assessment Prep</Link></li>
              <li><Link to="/glossary" className="nav-link hover:text-purple-300 px-3 py-2 rounded-md">Glossary</Link></li>
            </ul>
          </nav>
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-800">
              <ul className="flex flex-col items-center py-2 space-y-2">
                <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                <li><Link to="/unit3" onClick={() => setMobileMenuOpen(false)}>Unit 3</Link></li>
                <li><Link to="/unit4" onClick={() => setMobileMenuOpen(false)}>Unit 4</Link></li>
                <li><Link to="/assessment-prep" onClick={() => setMobileMenuOpen(false)}>Assessment Prep</Link></li>
                <li><Link to="/glossary" onClick={() => setMobileMenuOpen(false)}>Glossary</Link></li>
              </ul>
            </div>
          )}
        </header>

        <main className="container mx-auto px-6 py-8 min-h-[calc(100vh-160px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/unit3" element={<Unit3 />} />
            <Route path="/unit4" element={<Unit4 />} />
            <Route path="/assessment-prep" element={<AssessmentPrep />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/keyskillshub" element={<KeySkillsHub />} />
            <Route path="/unit3-sac2-prep" element={<Unit3SAC2Prep />} />
            <Route path="/unit3-quiz" element={<Unit3Quiz />} />
            <Route path="/unit3-flashcards" element={<Unit3Flashcards />} />
            <Route path="/unit3-practice" element={<Unit3PracticeQuestions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-slate-800 text-slate-400 text-center p-6 shadow-top">
          <p>&copy; {new Date().getFullYear()} VCE HHD Study Hub. All rights reserved.</p>
          <p className="text-sm mt-1">Unofficial study support. Always refer to official VCAA materials.</p>
        </footer>

        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
