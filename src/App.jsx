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
import Progress from './pages/ProgressComponent.jsx';
import SearchBar from './components/SearchBar.jsx';
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
    try {
      localStorage.setItem('visited_' + pathname, 'true');
    } catch {}
  }, [pathname]);
  return null;
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
            <div className="flex items-center space-x-3">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="hidden md:inline-block text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.36 5.36l-.7-.7m-12.72 0l-.7.7m12.72-10.72l-.7.7m-12.72 0l-.7-.7M17 12a5 5 0 11-10 0 5 5 0 0110 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-600 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
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
              <li><Link to="/" className="nav-link px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link to="/unit3" className="nav-link px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Unit 3</Link></li>
              <li><Link to="/unit4" className="nav-link px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Unit 4</Link></li>
              <li><Link to="/assessment-prep" className="nav-link px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Assessment Prep</Link></li>
              <li><Link to="/glossary" className="nav-link px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Glossary</Link></li>
              <li><Link to="/progress" className="nav-link px-3 py-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Progress</Link></li>
            </ul>
          </nav>
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-100 dark:bg-surface">
              <ul className="flex flex-col items-center py-2 space-y-2">
                <li className="w-11/12"><SearchBar /></li>
                <li>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="text-slate-200 hover:text-purple-400 transition-colors"
                  >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </li>
                <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className="transition-colors hover:text-purple-600">Home</Link></li>
                <li><Link to="/unit3" onClick={() => setMobileMenuOpen(false)} className="transition-colors hover:text-purple-600">Unit 3</Link></li>
                <li><Link to="/unit4" onClick={() => setMobileMenuOpen(false)} className="transition-colors hover:text-purple-600">Unit 4</Link></li>
                <li><Link to="/assessment-prep" onClick={() => setMobileMenuOpen(false)} className="transition-colors hover:text-purple-600">Assessment Prep</Link></li>
                <li><Link to="/glossary" onClick={() => setMobileMenuOpen(false)} className="transition-colors hover:text-purple-600">Glossary</Link></li>
                <li><Link to="/progress" onClick={() => setMobileMenuOpen(false)} className="transition-colors hover:text-purple-600">Progress</Link></li>
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
            <Route path="/progress" element={<Progress />} />
            <Route path="/keyskillshub" element={<KeySkillsHub />} />
            <Route path="/unit3-sac2-prep" element={<Unit3SAC2Prep />} />
            <Route path="/unit3-quiz" element={<Unit3Quiz />} />
            <Route path="/unit3-flashcards" element={<Unit3Flashcards />} />
            <Route path="/unit3-practice" element={<Unit3PracticeQuestions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-gray-100 dark:bg-surface text-slate-500 dark:text-slate-400 text-center p-6 shadow-top transition-colors">
          <p>&copy; {new Date().getFullYear()} VCE HHD Study Hub. All rights reserved.</p>
          <p className="text-sm mt-1">Unofficial study support. Always refer to official VCAA materials.</p>
        </footer>

        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
