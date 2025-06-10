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
    <button onClick={scrollTop} className="fixed bottom-5 right-5 bg-purple-600 hover:bg-purple-700 text-white font-bold p-3 rounded-full shadow-lg z-40 transition-colors">
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

// Navigation component with active page highlighting
function NavLink({ to, children, onClick, className = "" }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`nav-link px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 ${
        isActive
          ? 'text-purple-400 bg-purple-900/30 border-b-2 border-purple-400 font-semibold'
          : 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
      } ${className}`}
    >
      {children}
    </Link>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTopOnRouteChange />

      <div className="font-sans antialiased min-h-screen bg-gray-50 dark:bg-outer text-slate-800 dark:text-slate-200 transition-colors">
        <header className="bg-gray-100 dark:bg-surface shadow-lg sticky top-0 z-50 transition-colors">
          <nav className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">HHD Hub</Link>

            <div className="flex items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="hidden md:inline-block mr-4 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>

            <ul className="hidden md:flex space-x-6">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/unit3">Unit 3</NavLink></li>
              <li><NavLink to="/unit4">Unit 4</NavLink></li>
              <li><NavLink to="/assessment-prep">Assessment Prep</NavLink></li>
              <li><NavLink to="/glossary">Glossary</NavLink></li>
            </ul>
          </nav>
          
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-100 dark:bg-surface border-t border-slate-300 dark:border-slate-600">
              <ul className="flex flex-col py-2 space-y-1 px-4">
                <li>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full text-left px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-md"
                  >
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </button>
                </li>
                <li><NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block w-full">Home</NavLink></li>
                <li><NavLink to="/unit3" onClick={() => setMobileMenuOpen(false)} className="block w-full">Unit 3</NavLink></li>
                <li><NavLink to="/unit4" onClick={() => setMobileMenuOpen(false)} className="block w-full">Unit 4</NavLink></li>
                <li><NavLink to="/assessment-prep" onClick={() => setMobileMenuOpen(false)} className="block w-full">Assessment Prep</NavLink></li>
                <li><NavLink to="/glossary" onClick={() => setMobileMenuOpen(false)} className="block w-full">Glossary</NavLink></li>
              </ul>
            </div>
          )}
        </header>

        <main className="max-w-5xl mx-auto px-4 md:px-8 py-8 min-h-[calc(100vh-160px)]">
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

        <ScrollToTopButton />

        <footer className="bg-gray-100 dark:bg-surface border-t border-slate-300 dark:border-slate-600 mt-16 transition-colors">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-purple-500 dark:text-purple-400 mb-3">VCE HHD Study Hub</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  A comprehensive resource for VCE Health and Human Development students. 
                  Interactive tools, practice questions, and study materials to help you succeed.
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-slate-700 dark:text-slate-300 mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/unit3" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Unit 3 Content</Link></li>
                  <li><Link to="/unit3-quiz" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Practice Quiz</Link></li>
                  <li><Link to="/glossary" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Glossary</Link></li>
                  <li><Link to="/keyskillshub" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Key Skills</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-medium text-slate-700 dark:text-slate-300 mb-3">Study Tools</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/unit3-flashcards" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Flashcards</Link></li>
                  <li><Link to="/unit3-practice" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Practice Questions</Link></li>
                  <li><Link to="/unit3-sac2-prep" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">SAC 2 Prep</Link></li>
                  <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Study Guides</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-300 dark:border-slate-600 mt-8 pt-6 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-500">
                © 2025 VCE HHD Study Hub. Educational content based on the Victorian Curriculum and Assessment Authority (VCAA) study design.
                <br />
                <em>Always refer to official VCAA resources for assessment requirements.</em>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
